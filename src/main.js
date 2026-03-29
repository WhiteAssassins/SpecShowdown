import './styles.css';

import { categoryOrder, createDemoProfiles, createEmptyProfile, createId, hydrateProfiles } from './data.js';
import { copyToClipboard, downloadJson, downloadNodeAsPng, downloadText } from './exporters.js';
import { createTranslator, languages } from './i18n.js';
import { buildShareUrl, clearShareHash, decodeSharePayload } from './share.js';
import { loadState, saveState } from './storage.js';

const app = document.querySelector('#app');
const storedState = loadState();
const initialLanguage = storedState?.language || (navigator.language?.toLowerCase().startsWith('es') ? 'es' : 'en');
const initialProfiles =
  storedState?.profiles?.length > 0 ? hydrateProfiles(storedState.profiles) : createDemoProfiles(initialLanguage);
const initialSharedCompare = normalizeSharedPayload(decodeSharePayload());
const storedVisibleCategories = storedState?.visibleCategories?.filter(Boolean) || [];
const hasCurrentVisibleCategories =
  storedVisibleCategories.length > 0 && storedVisibleCategories.every((category) => categoryOrder.includes(category));

const state = {
  language: initialLanguage,
  profiles: initialProfiles,
  selectedProfileId: storedState?.selectedProfileId || initialProfiles[0]?.id || null,
  compareLeftId: storedState?.compareLeftId || initialProfiles[0]?.id || null,
  compareRightId: storedState?.compareRightId || initialProfiles[1]?.id || initialProfiles[0]?.id || null,
  shareMode: storedState?.shareMode === 'compare' ? 'compare' : 'profile',
  cardStyle: storedState?.cardStyle || 'editorial',
  visibleCategories: hasCurrentVisibleCategories ? storedVisibleCategories : [...categoryOrder],
  viewMode: storedState?.viewMode === 'minimal' ? 'minimal' : 'full',
  sharedCompare: initialSharedCompare,
  notice: null,
  lastSavedAt: storedState?.lastSavedAt || null,
};

if (initialSharedCompare?.visibleCategories?.length) {
  state.visibleCategories = initialSharedCompare.visibleCategories;
}

if (initialSharedCompare?.viewMode) {
  state.viewMode = initialSharedCompare.viewMode;
}

ensureStateIntegrity();
renderShell();
renderAll();
bindEvents();
persistState(false);

function normalizeSharedPayload(payload) {
  if (!payload?.left || !payload?.right) {
    return null;
  }

  return {
    left: hydrateProfiles([payload.left])[0],
    right: hydrateProfiles([payload.right])[0],
    visibleCategories: payload.visibleCategories?.filter((category) => categoryOrder.includes(category)) || [...categoryOrder],
    viewMode: payload.viewMode === 'minimal' ? 'minimal' : 'full',
  };
}

function ensureStateIntegrity() {
  state.profiles = hydrateProfiles(state.profiles);

  if (!state.profiles.length) {
    state.selectedProfileId = null;
    state.compareLeftId = null;
    state.compareRightId = null;
    return;
  }

  if (!state.profiles.some((profile) => profile.id === state.selectedProfileId)) {
    state.selectedProfileId = state.profiles[0].id;
  }

  if (!state.profiles.some((profile) => profile.id === state.compareLeftId)) {
    state.compareLeftId = state.profiles[0].id;
  }

  if (!state.profiles.some((profile) => profile.id === state.compareRightId)) {
    state.compareRightId = state.profiles[1]?.id || state.profiles[0].id;
  }

  state.visibleCategories = state.visibleCategories.filter((category) => categoryOrder.includes(category));

  if (!state.visibleCategories.length) {
    state.visibleCategories = [...categoryOrder];
  }
}

function bindEvents() {
  if (app.dataset.bound === 'true') {
    return;
  }

  app.dataset.bound = 'true';

  app.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-action]');

    if (!button) {
      return;
    }

    const action = button.dataset.action;

    if (action === 'set-language') {
      if (languages.includes(button.dataset.language) && state.language !== button.dataset.language) {
        state.language = button.dataset.language;
        renderShell();
        renderAll();
        persistState(false);
      }
      return;
    }

    if (action === 'new-profile') {
      const profile = createEmptyProfile(t('editor.newProfileName'));
      state.profiles.unshift(profile);
      state.selectedProfileId = profile.id;
      if (!state.compareLeftId) {
        state.compareLeftId = profile.id;
      } else if (!state.compareRightId) {
        state.compareRightId = profile.id;
      }
      renderAll();
      persistState();
      return;
    }

    if (action === 'select-profile') {
      state.selectedProfileId = button.dataset.profileId;
      renderLibrary();
      renderEditor();
      return;
    }

    if (action === 'duplicate-profile') {
      const source = getProfileById(button.dataset.profileId);
      if (!source) {
        return;
      }
      const duplicate = structuredClone(source);
      duplicate.id = createId();
      duplicate.name = `${source.name || t('editor.newProfileName')} ${t('common.copySuffix')}`;
      state.profiles.unshift(duplicate);
      state.selectedProfileId = duplicate.id;
      setNotice('notices.duplicated');
      renderAll();
      persistState();
      return;
    }

    if (action === 'delete-profile') {
      state.profiles = state.profiles.filter((profile) => profile.id !== button.dataset.profileId);
      ensureStateIntegrity();
      setNotice('notices.deleted');
      renderAll();
      persistState();
      return;
    }

    if (action === 'load-demo-data') {
      state.profiles = createDemoProfiles(state.language);
      state.selectedProfileId = state.profiles[0].id;
      state.compareLeftId = state.profiles[0].id;
      state.compareRightId = state.profiles[1].id;
      state.sharedCompare = null;
      clearShareHash();
      setNotice('notices.demoLoaded');
      renderAll();
      persistState();
      return;
    }

    if (action === 'view-mode') {
      state.viewMode = button.dataset.mode === 'minimal' ? 'minimal' : 'full';
      renderComparison();
      renderShare();
      persistState();
      return;
    }

    if (action === 'set-share-mode') {
      state.shareMode = button.dataset.mode === 'compare' ? 'compare' : 'profile';
      renderShare();
      persistState(false);
      return;
    }

    if (action === 'set-card-style') {
      state.cardStyle = button.dataset.style || 'editorial';
      renderShare();
      persistState(false);
      return;
    }

    if (action === 'assign-left') {
      const profileId = button.dataset.profileId || state.selectedProfileId;
      if (profileId) {
        state.compareLeftId = profileId;
        renderHeroShowcase();
        renderLibrary();
        renderComparison();
        renderShare();
        persistState();
      }
      return;
    }

    if (action === 'assign-right') {
      const profileId = button.dataset.profileId || state.selectedProfileId;
      if (profileId) {
        state.compareRightId = profileId;
        renderHeroShowcase();
        renderLibrary();
        renderComparison();
        renderShare();
        persistState();
      }
      return;
    }

    if (action === 'swap-compare') {
      const previousLeft = state.compareLeftId;
      state.compareLeftId = state.compareRightId;
      state.compareRightId = previousLeft;
      renderHeroShowcase();
      renderLibrary();
      renderComparison();
      renderShare();
      persistState();
      return;
    }

    if (action === 'copy-share-link') {
      const payload = buildComparePayload();
      if (!payload) {
        return;
      }

      try {
        const copied = await copyToClipboard(buildShareUrl(payload));
        setNotice(copied ? 'compare.copiedLink' : 'notices.copyFailed');
      } catch (error) {
        setNotice('notices.copyFailed');
      }
      renderComparison();
      return;
    }

    if (action === 'clear-shared-mode') {
      state.sharedCompare = null;
      clearShareHash();
      renderAll();
      persistState();
      return;
    }

    if (action === 'import-shared') {
      if (!state.sharedCompare) {
        return;
      }

      const importedLeft = structuredClone(state.sharedCompare.left);
      const importedRight = structuredClone(state.sharedCompare.right);
      importedLeft.id = createId('import');
      importedRight.id = createId('import');

      state.profiles.unshift(importedRight);
      state.profiles.unshift(importedLeft);
      state.selectedProfileId = importedLeft.id;
      state.compareLeftId = importedLeft.id;
      state.compareRightId = importedRight.id;
      state.sharedCompare = null;
      clearShareHash();
      setNotice('notices.imported');
      renderAll();
      persistState();
      return;
    }

    if (action === 'download-image') {
      const node = document.querySelector('[data-export-card]');
      if (!node) {
        return;
      }

      await downloadNodeAsPng(node, 'specshowdown-card.png');
      setNotice('notices.imageReady');
      renderShare();
      return;
    }

    if (action === 'download-json') {
      const payload = buildExportPayload();
      if (!payload) {
        return;
      }

      downloadJson(payload, 'specshowdown-summary.json');
      setNotice('notices.jsonReady');
      renderShare();
      return;
    }

    if (action === 'download-text') {
      downloadText(buildTextSummary(), 'specshowdown-summary.txt');
      setNotice('notices.textReady');
      renderShare();
      return;
    }

    if (action === 'copy-text') {
      try {
        const copied = await copyToClipboard(buildTextSummary());
        setNotice(copied ? 'share.copiedText' : 'notices.copyFailed');
      } catch (error) {
        setNotice('notices.copyFailed');
      }
      renderShare();
    }
  });

  app.addEventListener('input', (event) => {
    const field = event.target.closest('[data-field]');

    if (!field) {
      return;
    }

    const profile = getSelectedProfile();
    if (!profile) {
      return;
    }

    const key = field.dataset.field;
    const value = field.value;

    if (categoryOrder.includes(key)) {
      profile.gear[key] = value;
    } else {
      profile[key] = value;
    }

    renderLibrary();
    renderHeroShowcase();
    renderComparison();
    renderShare();
    persistState();
  });

  app.addEventListener('change', (event) => {
    const select = event.target.closest('[data-select]');

    if (select) {
      if (select.dataset.select === 'left') {
        state.compareLeftId = select.value;
      }

      if (select.dataset.select === 'right') {
        state.compareRightId = select.value;
      }

      renderHeroShowcase();
      renderComparison();
      renderShare();
      persistState();
      return;
    }

    const toggle = event.target.closest('[data-category-toggle]');
    if (toggle) {
      const category = toggle.dataset.categoryToggle;

      if (toggle.checked) {
        if (!state.visibleCategories.includes(category)) {
          state.visibleCategories.push(category);
        }
      } else {
        state.visibleCategories = state.visibleCategories.filter((item) => item !== category);
      }

      renderComparison();
      renderShare();
      persistState();
    }
  });
}

function renderShell() {
  document.documentElement.lang = state.language;
  document.title = t('meta.title');

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute('content', t('meta.description'));
  }

  app.innerHTML = `
    <header class="topbar">
      <div class="brandmark">
        <p class="brandmark__eyebrow">${t('brand.name')}</p>
        <h1 class="brandmark__title">${t('brand.tagline')}</h1>
      </div>
      <nav class="topbar__nav" aria-label="Primary">
        <a href="#workspace">${t('nav.workspace')}</a>
        <a href="#compare-stage">${t('nav.compare')}</a>
        <a href="#share-stage">${t('nav.share')}</a>
      </nav>
      <div class="language-switcher" aria-label="${t('nav.language')}">
        ${languages
          .map(
            (language) => `
              <button
                type="button"
                class="${state.language === language ? 'is-active' : ''}"
                data-action="set-language"
                data-language="${language}"
                aria-pressed="${state.language === language}"
              >
                ${language.toUpperCase()}
              </button>
            `,
          )
          .join('')}
      </div>
    </header>

    <section class="hero">
      <div class="hero__copy">
        <p class="hero__eyebrow">${t('hero.eyebrow')}</p>
        <h2 class="hero__title">${wrapAccent(t('hero.title'), t('hero.accent'))}</h2>
        <p class="hero__body">${t('hero.body')}</p>
        <div class="hero__actions">
          <a class="button button--primary" href="#workspace">${t('hero.primaryCta')}</a>
          <button class="button button--ghost" type="button" data-action="load-demo-data">${t('hero.secondaryCta')}</button>
        </div>
        <div class="hero__stats">
          <span>${t('hero.statOne')}</span>
          <span>${t('hero.statTwo')}</span>
          <span>${t('hero.statThree')}</span>
        </div>
      </div>
      <div class="hero__stage" id="hero-showcase"></div>
    </section>

    <main class="workspace-shell" id="workspace">
      <section class="workspace-intro">
        <p class="section-label">${t('workspace.title')}</p>
        <h2>${t('workspace.body')}</h2>
      </section>
      <div class="workspace-grid">
        <div class="workspace-stack">
          <aside class="panel panel--library" id="library-panel"></aside>
          <section class="panel panel--editor" id="editor-panel"></section>
        </div>
        <section class="panel panel--compare" id="compare-panel"></section>
      </div>
    </main>

    <section class="share-stage" id="share-stage">
      <div class="share-stage__header">
        <p class="section-label">${t('share.title')}</p>
        <h2>${t('share.body')}</h2>
      </div>
      <div class="share-stage__grid">
        <section class="panel panel--share" id="share-panel"></section>
        <section class="panel panel--export" id="export-panel"></section>
      </div>
    </section>
  `;
}

function renderAll() {
  renderHeroShowcase();
  renderLibrary();
  renderEditor();
  renderComparison();
  renderShare();
}

function renderHeroShowcase() {
  const container = document.querySelector('#hero-showcase');
  if (!container) {
    return;
  }

  const { left, right, visibleCategories } = getComparisonContext();
  const rows = visibleCategories
    .slice(0, 4)
    .map((category) => {
      const leftValue = left?.gear?.[category] || '—';
      const rightValue = right?.gear?.[category] || '—';
      const same = leftValue !== '—' && leftValue === rightValue;

      return `
        <div class="mini-compare__row">
          <span>${t(`category.${category}`)}</span>
          <strong>${escapeHtml(leftValue)}</strong>
          <strong>${escapeHtml(rightValue)}</strong>
          <em>${same ? t('compare.sameTag') : ''}</em>
        </div>
      `;
    })
    .join('');

  const helperList = [t('hero.helperOne'), t('hero.helperTwo'), t('hero.helperThree')]
    .map((item) => `<li>${item}</li>`)
    .join('');

  container.innerHTML = `
    <article class="poster">
      <div class="poster__glow"></div>
      <div class="poster__header">
        <p>${t('hero.helperTitle')}</p>
        <span>${t('share.generatedFrom')}</span>
      </div>
      <div class="poster__title">
        <h3>${left?.name || 'SpecShowdown'}</h3>
        <p>${t('common.versus')}</p>
        <h3>${right?.name || t('common.secondSetup')}</h3>
      </div>
      <div class="mini-compare">
        <div class="mini-compare__row mini-compare__row--head">
          <span>${t('common.category')}</span>
          <strong>${left?.owner || left?.name || t('common.left')}</strong>
          <strong>${right?.owner || right?.name || t('common.right')}</strong>
          <em></em>
        </div>
        ${rows}
      </div>
      <ul class="poster__list">${helperList}</ul>
    </article>
  `;
}

function renderLibrary() {
  const container = document.querySelector('#library-panel');
  if (!container) {
    return;
  }

  if (!state.profiles.length) {
    container.innerHTML = `
      <div class="panel__header">
        <p class="section-label">${t('library.title')}</p>
        <h2>${t('library.emptyTitle')}</h2>
        <p>${t('library.emptyBody')}</p>
      </div>
      <div class="panel__actions">
        <button class="button button--primary" type="button" data-action="new-profile">${t('library.create')}</button>
        <button class="button button--ghost" type="button" data-action="load-demo-data">${t('library.useDemo')}</button>
      </div>
    `;
    return;
  }

  const items = state.profiles
    .map((profile) => {
      const filled = categoryOrder.filter((category) => profile.gear[category]?.trim()).length;
      const isSelected = state.selectedProfileId === profile.id;
      const compareBadges = [
        state.compareLeftId === profile.id ? `<span class="slot-pill slot-pill--left">${t('library.leftSlot')}</span>` : '',
        state.compareRightId === profile.id ? `<span class="slot-pill slot-pill--right">${t('library.rightSlot')}</span>` : '',
      ]
        .filter(Boolean)
        .join('');

      return `
        <article class="library-item ${isSelected ? 'is-selected' : ''}">
          <button class="library-item__body" type="button" data-action="select-profile" data-profile-id="${profile.id}">
            <span class="library-item__status">${isSelected ? t('library.selected') : t('library.selectForEdit')}</span>
            <h3>${escapeHtml(profile.name || t('editor.newProfileName'))}</h3>
            <p>${escapeHtml(profile.tagline || profile.owner || '—')}</p>
            <div class="library-item__meta">
              <span>${t('library.filled', { count: filled })}</span>
              ${compareBadges}
            </div>
          </button>
          <div class="library-item__actions">
            <button type="button" data-action="assign-left" data-profile-id="${profile.id}">${t('library.leftSlot')}</button>
            <button type="button" data-action="assign-right" data-profile-id="${profile.id}">${t('library.rightSlot')}</button>
            <button type="button" data-action="duplicate-profile" data-profile-id="${profile.id}">${t('library.duplicate')}</button>
            <button type="button" data-action="delete-profile" data-profile-id="${profile.id}">${t('library.delete')}</button>
          </div>
        </article>
      `;
    })
    .join('');

  container.innerHTML = `
    <div class="panel__header">
      <p class="section-label">${t('library.title')}</p>
      <h2>${t('library.body')}</h2>
      <p class="panel__status">${t('library.localStatus')}</p>
    </div>
    <div class="panel__actions">
      <button class="button button--primary" type="button" data-action="new-profile">${t('library.create')}</button>
      <button class="button button--ghost" type="button" data-action="load-demo-data">${t('actions.loadDemo')}</button>
    </div>
    <p class="panel__hint">${t('library.hint')}</p>
    <div class="library-list">${items}</div>
  `;
}

function renderEditor() {
  const container = document.querySelector('#editor-panel');
  if (!container) {
    return;
  }

  const profile = getSelectedProfile();
  if (!profile) {
    container.innerHTML = `
      <div class="panel__header">
        <p class="section-label">${t('editor.title')}</p>
        <h2>${t('editor.emptyTitle')}</h2>
        <p>${t('editor.emptyBody')}</p>
      </div>
    `;
    return;
  }

  const gearFields = categoryOrder
    .map(
      (category) => `
        <label class="field">
          <span>${t(`category.${category}`)}</span>
          <input
            type="text"
            data-field="${category}"
            value="${escapeHtml(profile.gear[category] || '')}"
            placeholder="${t(`placeholder.${category}`)}"
          />
        </label>
      `,
    )
    .join('');

  container.innerHTML = `
    <div class="panel__header">
      <p class="section-label">${t('editor.title')}</p>
      <h2>${t('editor.body')}</h2>
      <p class="panel__hint">${t('editor.onboarding')}</p>
      ${state.lastSavedAt ? `<p class="panel__status">${formatSavedTime(state.lastSavedAt)}</p>` : ''}
    </div>
    <div class="editor-shortcuts">
      <button class="button button--ghost" type="button" data-action="assign-left" data-profile-id="${profile.id}">${t('compare.useActiveLeft')}</button>
      <button class="button button--ghost" type="button" data-action="assign-right" data-profile-id="${profile.id}">${t('compare.useActiveRight')}</button>
    </div>
    <form class="editor-form" autocomplete="off">
      <div class="form-block">
        <div class="form-block__title">
          <p class="section-label">${t('editor.identityTitle')}</p>
        </div>
        <div class="identity-grid">
          <label class="field">
            <span>${t('editor.name')}</span>
            <input type="text" data-field="name" value="${escapeHtml(profile.name || '')}" placeholder="${t('editor.namePlaceholder')}" />
          </label>
          <label class="field">
            <span>${t('editor.owner')}</span>
            <input type="text" data-field="owner" value="${escapeHtml(profile.owner || '')}" placeholder="${t('editor.ownerPlaceholder')}" />
          </label>
        </div>
        <label class="field">
          <span>${t('editor.tagline')}</span>
          <input type="text" data-field="tagline" value="${escapeHtml(profile.tagline || '')}" placeholder="${t('editor.taglinePlaceholder')}" />
        </label>
      </div>
      <div class="form-block">
        <div class="form-block__title">
          <p class="section-label">${t('editor.gearTitle')}</p>
        </div>
        <div class="gear-grid">${gearFields}</div>
      </div>
      <div class="form-block">
        <div class="form-block__title">
          <p class="section-label">${t('editor.notesTitle')}</p>
        </div>
        <label class="field">
          <span>${t('editor.notes')}</span>
          <textarea rows="5" data-field="notes" placeholder="${t('editor.notesPlaceholder')}">${escapeHtml(profile.notes || '')}</textarea>
        </label>
      </div>
    </form>
  `;
}

function renderComparison() {
  const container = document.querySelector('#compare-panel');
  if (!container) {
    return;
  }

  const { left, right, visibleCategories, isShared } = getComparisonContext();
  if (!left || !right) {
    container.innerHTML = `
      <div class="panel__header">
        <p class="section-label">${t('compare.title')}</p>
        <h2>${t('compare.emptyTitle')}</h2>
        <p>${t('compare.emptyBody')}</p>
      </div>
      <button class="button button--ghost" type="button" data-action="load-demo-data">${t('compare.loadDemoCompare')}</button>
    `;
    return;
  }

  const filterChips = categoryOrder
    .map(
      (category) => `
        <label class="filter-chip">
          <input type="checkbox" data-category-toggle="${category}" ${visibleCategories.includes(category) ? 'checked' : ''} />
          <span>${t(`category.${category}`)}</span>
        </label>
      `,
    )
    .join('');

  const rows = visibleCategories.length
    ? visibleCategories
        .map((category) => {
          const leftValue = left.gear[category] || '—';
          const rightValue = right.gear[category] || '—';
          const same = leftValue !== '—' && leftValue === rightValue;

          return `
            <div class="compare-row ${same ? 'is-shared' : ''}">
              <div class="compare-row__label">
                <span>${t(`category.${category}`)}</span>
                ${same ? `<em>${t('compare.sameTag')}</em>` : ''}
              </div>
              <div class="compare-row__cell"><strong>${escapeHtml(leftValue)}</strong></div>
              <div class="compare-row__cell"><strong>${escapeHtml(rightValue)}</strong></div>
            </div>
          `;
        })
        .join('')
    : `<p class="empty-inline">${t('share.noCategories')}</p>`;

  const selectedProfile = getSelectedProfile();
  const quickProfileName = selectedProfile ? escapeHtml(selectedProfile.name) : '-';

  const compareToolbar = isShared
    ? `
      <div class="shared-toolbar">
        <div>
          <span>${t('compare.leftLabel')}</span>
          <strong>${escapeHtml(left.name)}</strong>
        </div>
        <div>
          <span>${t('compare.rightLabel')}</span>
          <strong>${escapeHtml(right.name)}</strong>
        </div>
      </div>
    `
    : `
      <div class="compare-toolbar">
        <label class="field field--compact">
          <span>${t('compare.leftLabel')}</span>
          <select data-select="left">${renderSelectOptions(state.compareLeftId)}</select>
        </label>
        <label class="field field--compact">
          <span>${t('compare.rightLabel')}</span>
          <select data-select="right">${renderSelectOptions(state.compareRightId)}</select>
        </label>
      </div>
    `;

  container.innerHTML = `
    <div class="panel__header" id="compare-stage">
      <p class="section-label">${t('compare.title')}</p>
      <h2>${t('compare.body')}</h2>
      ${isShared ? `<div class="shared-banner"><strong>${t('compare.sharedTitle')}</strong><p>${t('compare.sharedBody')}</p></div>` : ''}
      ${state.notice ? `<p class="panel__status panel__status--accent">${resolveText(state.notice)}</p>` : ''}
    </div>
    ${!isShared ? `
      <div class="compare-shortcuts">
        <div class="compare-shortcuts__current">
          <span>${t('compare.activeProfile')}</span>
          <strong>${quickProfileName}</strong>
        </div>
        <div class="compare-shortcuts__actions">
          <button class="button button--ghost" type="button" data-action="assign-left">${t('compare.useActiveLeft')}</button>
          <button class="button button--ghost" type="button" data-action="assign-right">${t('compare.useActiveRight')}</button>
          <button class="button button--ghost" type="button" data-action="swap-compare">${t('compare.swapProfiles')}</button>
        </div>
      </div>
    ` : ''}
    ${compareToolbar}
    <div class="mode-toggle" role="tablist" aria-label="${t('compare.title')}">
      <button type="button" class="${state.viewMode === 'minimal' ? 'is-active' : ''}" data-action="view-mode" data-mode="minimal">${t('compare.minimal')}</button>
      <button type="button" class="${state.viewMode === 'full' ? 'is-active' : ''}" data-action="view-mode" data-mode="full">${t('compare.full')}</button>
    </div>
    <div class="filter-section">
      <div>
        <p class="section-label">${t('compare.filters')}</p>
        <p class="panel__hint">${t('compare.filtersHint')}</p>
      </div>
      <div class="filter-grid">${filterChips}</div>
    </div>
    <article class="compare-board ${state.viewMode === 'minimal' ? 'is-minimal' : 'is-full'}">
      <div class="compare-board__head">
        <div>
          <p>${escapeHtml(left.owner || left.name)}</p>
          <h3>${escapeHtml(left.name)}</h3>
          ${state.viewMode === 'full' && left.tagline ? `<span>${escapeHtml(left.tagline)}</span>` : ''}
        </div>
        <div>
          <p>${escapeHtml(right.owner || right.name)}</p>
          <h3>${escapeHtml(right.name)}</h3>
          ${state.viewMode === 'full' && right.tagline ? `<span>${escapeHtml(right.tagline)}</span>` : ''}
        </div>
      </div>
      <div class="compare-board__rows">${rows}</div>
      ${
        state.viewMode === 'full'
          ? `
            <div class="compare-board__notes">
              <article>
                <p class="section-label">${t('compare.notesLabel')}</p>
                <p>${escapeHtml(left.notes || '—')}</p>
              </article>
              <article>
                <p class="section-label">${t('compare.notesLabel')}</p>
                <p>${escapeHtml(right.notes || '—')}</p>
              </article>
            </div>
          `
          : ''
      }
    </article>
    <div class="panel__actions">
      <button class="button button--primary" type="button" data-action="copy-share-link">${t('compare.copyShare')}</button>
      ${isShared ? `<button class="button button--ghost" type="button" data-action="import-shared">${t('compare.importShared')}</button>` : ''}
      ${isShared ? `<button class="button button--ghost" type="button" data-action="clear-shared-mode">${t('compare.clearShared')}</button>` : ''}
    </div>
  `;
}

function renderShare() {
  const sharePanel = document.querySelector('#share-panel');
  const exportPanel = document.querySelector('#export-panel');

  if (!sharePanel || !exportPanel) {
    return;
  }

  const { left, right, visibleCategories } = getComparisonContext();
  const activeProfile = getSelectedProfile();
  const useCompareCard = state.shareMode === 'compare' && left && right;

  if (!activeProfile && !useCompareCard) {
    sharePanel.innerHTML = '';
    exportPanel.innerHTML = '';
    return;
  }

  const shareCardMarkup = useCompareCard
    ? renderCompareShareCard(left, right, visibleCategories)
    : renderProfileShareCard(activeProfile, visibleCategories);

  const styleButtons = ['editorial', 'specsheet', 'spotlight']
    .map(
      (style) => `
        <button
          type="button"
          class="${state.cardStyle === style ? 'is-active' : ''}"
          data-action="set-card-style"
          data-style="${style}"
        >
          ${t(`share.style.${style}`)}
        </button>
      `,
    )
    .join('');

  sharePanel.innerHTML = `
    <div class="panel__header">
      <p class="section-label">${t('share.previewTitle')}</p>
      <h2>${t('share.previewBody')}</h2>
    </div>
    <div class="mode-toggle share-mode-toggle" role="tablist" aria-label="${t('share.title')}">
      <button type="button" class="${state.shareMode === 'profile' ? 'is-active' : ''}" data-action="set-share-mode" data-mode="profile">${t('share.profileMode')}</button>
      <button type="button" class="${state.shareMode === 'compare' ? 'is-active' : ''}" data-action="set-share-mode" data-mode="compare">${t('share.compareMode')}</button>
    </div>
    <div class="mode-toggle share-style-toggle" role="tablist" aria-label="${t('share.styleLabel')}">
      ${styleButtons}
    </div>
    <div class="share-card-preview">
      ${shareCardMarkup}
    </div>
  `;

  exportPanel.innerHTML = `
    <div class="panel__header">
      <p class="section-label">${t('share.textPreview')}</p>
      <h2>${t('share.body')}</h2>
    </div>
    <div class="panel__actions panel__actions--stacked">
      <button class="button button--primary" type="button" data-action="download-image">${t('share.exportImage')}</button>
      <button class="button button--ghost" type="button" data-action="download-json">${t('share.exportJson')}</button>
      <button class="button button--ghost" type="button" data-action="download-text">${t('share.exportText')}</button>
      <button class="button button--ghost" type="button" data-action="copy-text">${t('share.copyText')}</button>
    </div>
    <pre class="text-preview">${escapeHtml(buildTextSummary())}</pre>
  `;
}

function renderSelectOptions(selectedId) {
  return state.profiles
    .map(
      (profile) => `
        <option value="${profile.id}" ${profile.id === selectedId ? 'selected' : ''}>${escapeHtml(profile.name || t('editor.newProfileName'))}</option>
      `,
    )
    .join('');
}

function getComparisonContext() {
  if (state.sharedCompare) {
    return {
      left: state.sharedCompare.left,
      right: state.sharedCompare.right,
      visibleCategories: state.visibleCategories,
      isShared: true,
    };
  }

  return {
    left: getProfileById(state.compareLeftId),
    right: getProfileById(state.compareRightId),
    visibleCategories: state.visibleCategories,
    isShared: false,
  };
}

function buildComparePayload() {
  const { left, right, visibleCategories } = getComparisonContext();
  if (!left || !right) {
    return null;
  }

  return {
    left: structuredClone(left),
    right: structuredClone(right),
    visibleCategories,
    viewMode: state.viewMode,
  };
}

function buildExportPayload() {
  if (state.shareMode === 'profile') {
    const profile = getSelectedProfile();
    if (!profile) {
      return null;
    }

    return {
      mode: 'profile',
      profile: structuredClone(profile),
      visibleCategories: [...state.visibleCategories],
    };
  }

  const comparePayload = buildComparePayload();
  if (!comparePayload) {
    return null;
  }

  return {
    mode: 'compare',
    ...comparePayload,
  };
}

function buildTextSummary() {
  const { left, right, visibleCategories } = getComparisonContext();
  const activeProfile = getSelectedProfile();

  if (state.shareMode === 'profile' && activeProfile) {
    const lines = [
      `${t('brand.name')} | ${activeProfile.name}`,
      activeProfile.owner || activeProfile.name,
      activeProfile.tagline || '',
      '',
    ];

    visibleCategories.forEach((category) => {
      lines.push(`${t(`category.${category}`)}: ${activeProfile.gear[category] || '-'}`);
    });

    lines.push('');
    lines.push(`${t('compare.notesLabel')}: ${activeProfile.notes || '-'}`);
    return lines.join('\n');
  }

  if (!left || !right) {
    return '';
  }

  const lines = [
    `${t('brand.name')} | ${left.name} ${t('common.versus')} ${right.name}`,
    `${left.owner || left.name} <> ${right.owner || right.name}`,
    '',
  ];

  visibleCategories.forEach((category) => {
    lines.push(`${t(`category.${category}`)}: ${left.gear[category] || '—'} | ${right.gear[category] || '—'}`);
  });

  if (state.viewMode === 'full') {
    lines.push('');
    lines.push(`${left.name} ${t('compare.notesLabel')}: ${left.notes || '—'}`);
    lines.push(`${right.name} ${t('compare.notesLabel')}: ${right.notes || '—'}`);
  }

  return lines.join('\n');
}

function getSelectedProfile() {
  return getProfileById(state.selectedProfileId);
}

function getProfileById(profileId) {
  return state.profiles.find((profile) => profile.id === profileId) || null;
}

function persistState(updateTimestamp = true) {
  if (updateTimestamp) {
    state.lastSavedAt = Date.now();
  }

  saveState({
    language: state.language,
    profiles: state.profiles,
    selectedProfileId: state.selectedProfileId,
    compareLeftId: state.compareLeftId,
    compareRightId: state.compareRightId,
    shareMode: state.shareMode,
    cardStyle: state.cardStyle,
    visibleCategories: state.visibleCategories,
    viewMode: state.viewMode,
    lastSavedAt: state.lastSavedAt,
  });
}

function setNotice(key) {
  state.notice = key;
  window.clearTimeout(setNotice.timeout);
  setNotice.timeout = window.setTimeout(() => {
    state.notice = null;
    renderComparison();
  }, 2600);
}

function wrapAccent(fullText, accent) {
  return fullText.replace(accent, `<span class="hero__accent">${accent}</span>`);
}

function formatSavedTime(timestamp) {
  const formatter = new Intl.DateTimeFormat(state.language === 'es' ? 'es-ES' : 'en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  return `${t('notices.saved')} ${formatter.format(timestamp)}`;
}

function resolveText(key) {
  return key.includes('.') ? t(key) : key;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderProfileShareCard(profile, visibleCategories) {
  const specs = visibleCategories.length
    ? visibleCategories
        .map(
          (category) => `
            <div class="profile-line">
              <span>${t(`category.${category}`)}</span>
              <strong>${escapeHtml(profile.gear[category] || '-')}</strong>
            </div>
          `,
        )
        .join('')
    : `<p class="empty-inline">${t('share.noCategories')}</p>`;

  return `
    <div
      class="share-export-frame share-export-frame--${state.cardStyle}"
      data-export-card
      data-export-width="1200"
      data-export-height="675"
    >
      <article class="share-card share-card--landscape share-card--profile share-card--style-${state.cardStyle}">
        <div class="share-card__backdrop"></div>
        <div class="share-card__topline share-card__topline--profile">
          <span>${t('brand.name')}</span>
          <span>${t('share.profileLabel')}</span>
        </div>
        <div class="share-card__profile-layout">
          <section class="share-card__profile-copy">
            <p class="share-card__owner">${escapeHtml(profile.owner || profile.name)}</p>
            <h3>${escapeHtml(profile.name)}</h3>
            <div class="share-card__divider"></div>
            <span class="share-card__tagline">${escapeHtml(profile.tagline || '')}</span>
            <div class="share-card__metrics">
              <span>${t('share.categoriesCount', { count: visibleCategories.length })}</span>
              <span>${t('share.readyLabel')}</span>
            </div>
          </section>
          <section class="share-card__profile-grid">
            ${specs}
          </section>
        </div>
        <div class="share-card__footer">
          <article class="share-card__note share-card__note--full">
            <span>${t('compare.notesLabel')}</span>
            <p>${escapeHtml(profile.notes || t('share.notesFallback'))}</p>
          </article>
        </div>
      </article>
    </div>
  `;
}

function renderCompareShareCard(left, right, visibleCategories) {
  const leftSpecs = visibleCategories.length
    ? visibleCategories
        .map(
          (category) => `
            <article class="share-spec">
              <span>${t(`category.${category}`)}</span>
              <strong>${escapeHtml(left.gear[category] || '-')}</strong>
            </article>
          `,
        )
        .join('')
    : `<p class="empty-inline">${t('share.noCategories')}</p>`;

  const rightSpecs = visibleCategories.length
    ? visibleCategories
        .map(
          (category) => `
            <article class="share-spec share-spec--right">
              <span>${t(`category.${category}`)}</span>
              <strong>${escapeHtml(right.gear[category] || '-')}</strong>
            </article>
          `,
        )
        .join('')
    : `<p class="empty-inline">${t('share.noCategories')}</p>`;

  const sharedCount = visibleCategories.filter((category) => {
    const leftValue = left.gear[category] || '';
    const rightValue = right.gear[category] || '';
    return leftValue.trim() && leftValue === rightValue;
  }).length;

  const leftNote = escapeHtml(left.notes || left.tagline || t('share.notesFallback'));
  const rightNote = escapeHtml(right.notes || right.tagline || t('share.notesFallback'));

  return `
    <div
      class="share-export-frame share-export-frame--${state.cardStyle}"
      data-export-card
      data-export-width="1200"
      data-export-height="675"
    >
      <article class="share-card share-card--landscape share-card--compare share-card--style-${state.cardStyle}">
        <div class="share-card__backdrop"></div>
        <div class="share-card__topline">
          <span>${t('brand.name')}</span>
          <span>${t('share.horizontalLabel')}</span>
        </div>
        <div class="share-card__matchup">
          <section class="share-card__side share-card__side--left">
            <p>${escapeHtml(left.owner || left.name)}</p>
            <h3>${escapeHtml(left.name)}</h3>
            <span>${escapeHtml(left.tagline || '')}</span>
            <div class="share-card__gear">${leftSpecs}</div>
          </section>
          <div class="share-card__center">
            <div class="share-card__versus">${t('common.versus')}</div>
            <p class="share-card__label">${t('share.compareLabel')}</p>
            <div class="share-card__metrics">
              <span>${t('share.categoriesCount', { count: visibleCategories.length })}</span>
              <span>${t('share.sharedCount', { count: sharedCount })}</span>
              <span>${state.viewMode === 'minimal' ? t('compare.minimal') : t('compare.full')}</span>
            </div>
          </div>
          <section class="share-card__side share-card__side--right">
            <p>${escapeHtml(right.owner || right.name)}</p>
            <h3>${escapeHtml(right.name)}</h3>
            <span>${escapeHtml(right.tagline || '')}</span>
            <div class="share-card__gear">${rightSpecs}</div>
          </section>
        </div>
        <div class="share-card__footer">
          <article class="share-card__note">
            <span>${escapeHtml(left.name)}</span>
            <p>${leftNote}</p>
          </article>
          <article class="share-card__note">
            <span>${escapeHtml(right.name)}</span>
            <p>${rightNote}</p>
          </article>
        </div>
      </article>
    </div>
  `;
}

function t(path, params) {
  return createTranslator(state.language)(path, params);
}
