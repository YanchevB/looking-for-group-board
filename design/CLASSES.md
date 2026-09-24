# CLASSES.md

Reference table mapping each CSS file's classes to the React component that
will likely own them once these mockups are ported into the app. This is a
guide for wiring things up by hand — it does not affect the mockups.

## base.css

| Class | Used by (future component) |
|---|---|
| `.container` | Every page/layout wrapper |
| `.page-main` | App shell / layout (content area between header & footer) |
| `.section`, `.section__heading` | Any page with grouped content (Catalog, MySessions) |
| `.visually-hidden` | Any component with screen-reader-only text |
| `.surface` | Generic panel wrapper (forms, action sidebar, info cards) |
| `.mockup-note` | Mockup files only — **do not port**, not a real app class |

## header.css

| Class | Used by (future component) |
|---|---|
| `.site-header`, `.site-header__inner` | `<Header>` |
| `.site-header__brand`, `.site-header__brand-mark` | `<Header>` (logo/link home) |
| `.site-header__nav`, `.site-header__link`, `.site-header__link--active` | `<Header>` / `<NavLink>` |
| `.site-header__actions` | `<Header>` (auth buttons or user menu wrapper) |
| `.site-header__user`, `.site-header__avatar` | `<Header>` (logged-in user badge) |

## footer.css

| Class | Used by (future component) |
|---|---|
| `.site-footer`, `.site-footer__inner` | `<Footer>` |
| `.site-footer__text` | `<Footer>` |
| `.site-footer__links`, `.site-footer__link` | `<Footer>` |

## button.css

| Class | Used by (future component) |
|---|---|
| `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--ghost`, `.btn--danger` | `<Button>` (shared across all pages) |
| `.btn--sm`, `.btn--lg`, `.btn--block` | `<Button>` size/layout modifiers |
| `.btn--disabled` / `[disabled]` | `<Button disabled>` (e.g. Join when full) |
| `.btn-group` | Any grouped actions (owner controls on `<SessionDetails>`) |

## form.css

| Class | Used by (future component) |
|---|---|
| `.form`, `.form__group`, `.form__label`, `.form__required`, `.form__hint` | `<SessionForm>` (Create/Edit), `<LoginForm>`, `<RegisterForm>`, `<CommentForm>` |
| `.form__input`, `.form__select`, `.form__textarea` | Same forms — text/number/email/password inputs, platform select, description textarea |
| `.form__checkbox-row`, `.form__checkbox`, `.form__checkbox-label` | `<SessionForm>` (mic required) |
| `.form__input--invalid`, `.form__select--invalid`, `.form__textarea--invalid`, `.form__error` | Any form field with inline validation |
| `.form__banner`, `.form__banner--error`, `.form__banner-icon` | Any form (form-level submit error) |
| `.form__actions` | Any form's submit/cancel row |

## session-card.css

| Class | Used by (future component) |
|---|---|
| `.session-grid` | `<Catalog>`, `<MySessions>` (card list wrapper) |
| `.session-card`, `.session-card--full`, `.session-card--closed` | `<SessionCard>` |
| `.session-card__header`, `__game`, `__platform` | `<SessionCard>` title area |
| `.session-card__meta`, `__meta-item`, `__slots`, `__mic-icon` | `<SessionCard>` player count / mic row |
| `.session-card__description` | `<SessionCard>` |
| `.session-card__footer`, `__host`, `__host-name` | `<SessionCard>` footer (host name + view button) |

## status-badge.css

| Class | Used by (future component) |
|---|---|
| `.status-badge`, `.status-badge__dot` | `<StatusBadge>` |
| `.status-badge--open`, `--full`, `--closed` | `<StatusBadge status={...}>` |

## session-details.css

| Class | Used by (future component) |
|---|---|
| `.session-details`, `__header`, `__title-group`, `__title`, `__platform` | `<SessionDetails>` header |
| `.session-details__meta`, `__meta-item`, `__meta-value` | `<SessionDetails>` meta row |
| `.session-details__body` | `<SessionDetails>` two-column layout |
| `.session-details__section`, `__section-title`, `__description` | `<SessionDetails>` info + description block |
| `.session-details__players`, `__player`, `__player--host`, `__player-avatar`, `__player-name`, `__player-tag` | `<PlayerList>` |
| `.session-details__actions`, `__actions-title`, `__notice`, `__owner-actions` | `<SessionActions>` (join/leave/owner controls, all variants) |

## comments.css

| Class | Used by (future component) |
|---|---|
| `.comments`, `.comments__title`, `.comments__list` | `<CommentSection>` |
| `.comment`, `__avatar`, `__body`, `__header`, `__author`, `__time`, `__text`, `__footer` | `<Comment>` |
| `.comment__delete` | `<Comment>` (shown only when `comment.author === currentUser`) |
| `.comments__form`, `.comments__form-row` | `<CommentForm>` |
| `.comments__login-prompt` | `<CommentSection>` guest variant |

## feedback.css

| Class | Used by (future component) |
|---|---|
| `.spinner`, `.loading-state` | Any async view: `<Catalog>`, `<MySessions>`, `<SessionDetails>` while fetching |
| `.error-box`, `__icon`, `__title`, `__text` | Any async view on fetch failure |
| `.empty-state`, `__icon`, `__title`, `__text` | `<Catalog>` ("No open sessions yet"), `<MySessions>` ("Joined" empty) |
