<script setup lang="ts">
const { t } = useLocale()
const active = ref<number | null>(null)

const spine = 'M 24 34 C 62 16, 100 16, 100 16 C 186 16, 228 50, 300 50 C 372 50, 414 16, 500 16 C 586 16, 628 50, 700 50 C 772 50, 814 16, 900 16 C 948 16, 976 30, 976 34'
const terrain = `${spine} L 976 86 L 24 86 Z`

const pins = [
  { x: 100, y: 16 },
  { x: 300, y: 50 },
  { x: 500, y: 16 },
  { x: 700, y: 50 },
  { x: 900, y: 16 }
]

const marks = ['understand', 'design', 'build', 'launch', 'evolve'] as const
</script>

<template>
  <section id="process" class="sz-route">
    <div class="sz-wrap">
      <Reveal>
        <div class="sz-route-head">
          <div class="sz-route-title-row">
            <div>
              <SazanSectionLabel :text="t.process.eyebrow" />
              <h2 class="sz-title mt-3 max-w-xl">{{ t.process.title }}</h2>
            </div>
            <p class="sz-route-range" aria-hidden="true">
              <span>{{ t.process.steps[0]?.n }}</span>
              <i />
              <span>{{ t.process.steps[4]?.n }}</span>
            </p>
          </div>
          <p class="sz-route-lede">{{ t.process.lede }}</p>
        </div>
      </Reveal>

      <div class="sz-route-board">
        <div class="sz-route-map">
          <svg class="sz-route-svg" viewBox="0 0 1000 86" role="img" aria-hidden="true">
            <path class="sz-terrain" :d="terrain" />
            <path class="sz-casing" :d="spine" />
            <path class="sz-lane" :d="spine" />
            <line
              v-for="pin in pins"
              :key="`h-${pin.x}`"
              class="sz-hanger"
              :x1="pin.x"
              :y1="pin.y"
              :x2="pin.x"
              y2="86"
            />
            <circle
              v-for="(pin, i) in pins"
              :key="`p-${pin.x}`"
              class="sz-pin"
              :class="{ 'is-on': active === i }"
              :cx="pin.x"
              :cy="pin.y"
              r="7"
            />
            <g class="sz-traveler">
              <animateMotion dur="11s" repeatCount="indefinite" :path="spine" />
              <circle r="6.5" class="sz-traveler-ring" />
              <circle r="2.7" class="sz-traveler-core" />
            </g>
          </svg>

          <ol class="sz-stops">
            <li
              v-for="(step, i) in t.process.steps"
              :key="step.n"
              class="sz-stop"
              :style="{ '--i': i }"
              @mouseenter="active = i"
              @mouseleave="active = null"
              @focusin="active = i"
              @focusout="active = null"
            >
              <div class="sz-mark" :class="`is-${marks[i]}`">
                <svg v-if="marks[i] === 'understand'" viewBox="0 0 48 48" aria-hidden="true">
                  <circle cx="24" cy="24" r="12" />
                  <path d="M24 10v3.5M24 34.5V38M10 24h3.5M34.5 24H38" />
                  <path d="M24 15l2.8 7.2L24 24.2l-2.8-2 2.8-7.2z" class="hot" />
                  <path d="M24 33l-2.8-7.2L24 24.2l2.8 2L24 33z" class="dim" />
                  <circle cx="24" cy="24" r="1.7" class="hot" />
                </svg>
                <svg v-else-if="marks[i] === 'design'" viewBox="0 0 48 48" aria-hidden="true">
                  <rect x="8" y="10" width="32" height="28" rx="4" />
                  <rect x="13" y="15" width="12" height="9" rx="1.6" class="hot" />
                  <path d="M28 17h8M28 21.5h6M13 29h22M13 33.5h14" />
                </svg>
                <svg v-else-if="marks[i] === 'build'" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M24 8l16 8.5v17L24 42 8 33.5v-17L24 8z" />
                  <path d="M24 24.5L40 16.5M24 24.5L8 16.5M24 24.5V42" />
                  <path d="M24 24.5l16-8v6L24 30.5 8 22.5v-6l16 8z" class="hot" />
                </svg>
                <svg v-else-if="marks[i] === 'launch'" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M16 38V14" />
                  <path d="M16 15h16l-4.5 6.5L32 28H16z" class="hot" />
                  <path d="M11 38h18" />
                  <circle cx="34" cy="13" r="2" class="hot" />
                </svg>
                <svg v-else viewBox="0 0 48 48" aria-hidden="true">
                  <rect x="17" y="16" width="14" height="17" rx="3" />
                  <path d="M21 23h6M21 27h4" />
                  <path d="M24 8a15 15 0 1 1-10.5 5.2" class="hot-line" />
                  <path d="M12.2 10.2l1.2 6.4 5.6-3.2" class="hot-line" />
                </svg>
              </div>
              <div class="sz-stop-copy">
                <p class="sz-stop-n">{{ step.n }}</p>
                <p class="sz-stop-tag">{{ step.tag }}</p>
                <h3 class="sz-stop-title">{{ step.title }}</h3>
                <p class="sz-stop-body">{{ step.body }}</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sz-route {
  padding-block: 2rem 2.15rem;
}

.sz-route-title-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem 1.5rem;
}

.sz-route-lede {
  max-width: 38rem;
  margin: 0.55rem 0 0;
  color: var(--sz-text-muted);
  font-size: 0.98rem;
  line-height: 1.65;
}

.sz-route-range {
  display: flex;
  flex: none;
  align-items: center;
  gap: 0.65rem;
  margin: 0 0 0.45rem;
  color: var(--sz-primary);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.14em;
}

.sz-route-range i {
  display: block;
  width: 4.25rem;
  height: 2px;
  border-radius: 99px;
  background:
    linear-gradient(90deg, var(--sz-primary), color-mix(in srgb, var(--sz-primary) 15%, transparent));
}

.sz-route-board {
  position: relative;
  margin-top: 0.95rem;
  overflow: hidden;
  border: 1px solid var(--sz-border);
  border-radius: calc(var(--sz-radius) + 0.35rem);
  background:
    radial-gradient(440px 160px at 0% 0%, color-mix(in srgb, var(--sz-primary) 14%, transparent), transparent 72%),
    radial-gradient(360px 180px at 100% 0%, color-mix(in srgb, var(--sz-primary) 8%, transparent), transparent 70%),
    var(--sz-surface);
  padding: 0.35rem 0.35rem 1.15rem;
}

.sz-route-board::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 46%;
  background-image: radial-gradient(circle, color-mix(in srgb, var(--sz-text) 22%, transparent) 1px, transparent 1.15px);
  background-size: 15px 15px;
  mask-image: linear-gradient(to bottom, #000 10%, transparent 88%);
  pointer-events: none;
}

.sz-route-map {
  position: relative;
}

.sz-route-svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.sz-terrain {
  fill: color-mix(in srgb, var(--sz-primary) 13%, transparent);
}

.sz-casing {
  fill: none;
  stroke: color-mix(in srgb, var(--sz-primary) 55%, var(--sz-border-strong));
  stroke-width: 11;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sz-lane {
  fill: none;
  stroke: var(--sz-primary);
  stroke-width: 2.2;
  stroke-linecap: round;
  stroke-dasharray: 8 11;
  stroke-dashoffset: 0;
  animation: sz-march 1.15s linear infinite;
}

.sz-hanger {
  stroke: color-mix(in srgb, var(--sz-text) 32%, var(--sz-border-strong));
  stroke-width: 1.6;
}

.sz-pin {
  fill: var(--sz-surface);
  stroke: var(--sz-primary);
  stroke-width: 2.6;
  transition: fill 0.3s ease;
}

.sz-pin.is-on {
  fill: var(--sz-primary);
}

.sz-traveler-ring {
  fill: var(--sz-surface);
  stroke: var(--sz-primary);
  stroke-width: 2.4;
}

.sz-traveler-core {
  fill: var(--sz-primary);
}

.sz-stops {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0;
  margin: -0.15rem 0 0;
  padding: 0;
  list-style: none;
}

.sz-stop {
  display: flex;
  min-width: 0;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 0.35rem 0.15rem;
  animation: sz-stop-in 0.7s var(--sz-ease) both;
  animation-delay: calc(var(--i) * 70ms);
}

.sz-mark {
  position: relative;
  display: grid;
  width: 4.35rem;
  height: 4.35rem;
  place-items: center;
  border: 1px solid var(--sz-border);
  border-radius: 1.15rem;
  background:
    linear-gradient(180deg, var(--sz-surface), color-mix(in srgb, var(--sz-background) 55%, var(--sz-surface)));
  box-shadow: var(--sz-shadow-soft);
  color: var(--sz-text);
  transition:
    transform 0.45s var(--sz-ease),
    border-color 0.35s ease,
    box-shadow 0.45s var(--sz-ease);
}

.sz-mark::before {
  content: "";
  position: absolute;
  top: -0.42rem;
  left: 50%;
  width: 0.55rem;
  height: 0.55rem;
  border: 2px solid var(--sz-primary);
  border-radius: 50%;
  background: var(--sz-surface);
  transform: translateX(-50%);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--sz-primary) 16%, transparent);
}

.sz-mark svg {
  width: 2.7rem;
  height: 2.7rem;
}

.sz-mark svg :deep(circle),
.sz-mark svg :deep(path),
.sz-mark svg :deep(rect) {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sz-mark svg :deep(.hot) {
  fill: var(--sz-primary);
  stroke: none;
}

.sz-mark svg :deep(.hot-line) {
  fill: none;
  stroke: var(--sz-primary);
}

.sz-mark svg :deep(.dim) {
  fill: color-mix(in srgb, currentColor 32%, transparent);
  stroke: none;
}

.sz-stop:hover .sz-mark,
.sz-stop:focus-within .sz-mark {
  border-color: var(--sz-primary-line);
  box-shadow: 0 16px 32px -22px color-mix(in srgb, var(--sz-primary) 80%, black);
  transform: translateY(-4px);
}

.sz-stop-n {
  margin: 0.8rem 0 0;
  color: var(--sz-primary);
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.14em;
}

.sz-stop-tag {
  margin: 0.28rem 0 0;
  color: var(--sz-text-subtle);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.sz-stop-title {
  margin: 0.2rem 0 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.15;
}

.sz-stop-body {
  margin: 0.4rem 0 0;
  color: var(--sz-text-muted);
  font-size: 0.8rem;
  line-height: 1.6;
}

@keyframes sz-march {
  to { stroke-dashoffset: -32; }
}

@keyframes sz-stop-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: none; }
}

@media (min-width: 768px) {
  .sz-route {
    padding-block: 2.55rem 2.7rem;
  }
}

@media (max-width: 980px) {
  .sz-route-svg,
  .sz-mark::before {
    display: none;
  }

  .sz-route-title-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 0.65rem;
  }

  .sz-route-range {
    margin: 0;
  }

  .sz-route-board {
    padding: 0.85rem 0.75rem 0.85rem;
  }

  .sz-route-board::before {
    height: 28%;
  }

  .sz-stops {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    margin-top: 0.35rem;
    padding: 0 0 0 0;
    padding-inline-start: 1.15rem;
  }

  .sz-stops::before {
    content: "";
    position: absolute;
    inset-inline-start: 0.28rem;
    top: 2.55rem;
    bottom: 2.55rem;
    width: 2px;
    background: repeating-linear-gradient(
      to bottom,
      var(--sz-primary) 0 7px,
      transparent 7px 13px
    );
  }

  .sz-stops::after {
    content: "";
    position: absolute;
    z-index: 1;
    inset-inline-start: 0.02rem;
    top: 2.3rem;
    width: 0.62rem;
    height: 0.62rem;
    border-radius: 50%;
    background: var(--sz-primary);
    box-shadow: 0 0 0 5px color-mix(in srgb, var(--sz-primary) 18%, transparent);
    animation: sz-drop 7.5s cubic-bezier(0.45, 0, 0.2, 1) infinite;
  }

  .sz-stop {
    position: relative;
    display: grid;
    grid-template-columns: 3.7rem minmax(0, 1fr);
    gap: 0.15rem 0.8rem;
    align-items: start;
    text-align: start;
    border: 1px solid var(--sz-border);
    border-radius: 1.05rem;
    background: color-mix(in srgb, var(--sz-background) 42%, var(--sz-surface));
    padding: 0.75rem 0.85rem;
    animation: none;
  }

  .sz-stop::after {
    content: "";
    position: absolute;
    top: calc(0.75rem + (3.7rem - 0.62rem) / 2);
    inset-inline-start: -1.05rem;
    width: 0.62rem;
    height: 0.62rem;
    border: 2px solid var(--sz-primary);
    border-radius: 50%;
    background: var(--sz-surface);
  }

  .sz-mark {
    width: 3.7rem;
    height: 3.7rem;
    border-radius: 0.95rem;
    box-shadow: none;
  }

  .sz-mark svg {
    width: 2.15rem;
    height: 2.15rem;
  }

  .sz-stop-n {
    margin: 0;
  }

  .sz-stop-copy {
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-template-rows: auto auto;
    column-gap: 0.55rem;
    align-items: baseline;
  }

  .sz-stop-n,
  .sz-stop-tag {
    grid-row: 1;
  }

  .sz-stop-title,
  .sz-stop-body {
    grid-column: 1 / -1;
  }

  .sz-stop-title {
    margin-top: 0.1rem;
    font-size: 1.2rem;
  }

  .sz-stop-body {
    margin-top: 0.25rem;
    font-size: 0.84rem;
  }
}

html[dir="rtl"] .sz-route-svg {
  transform: scaleX(-1);
  transform-origin: center;
}

html[dir="rtl"] .sz-route-range i {
  transform: scaleX(-1);
}

html[lang="fa"] .sz-route-range,
html[dir="rtl"] .sz-route-range,
html[lang="fa"] .sz-stop-n,
html[dir="rtl"] .sz-stop-n,
html[lang="fa"] .sz-stop-tag,
html[dir="rtl"] .sz-stop-tag,
html[lang="fa"] .sz-stop-title,
html[dir="rtl"] .sz-stop-title {
  font-family: var(--font-persian);
  letter-spacing: 0;
  text-transform: none;
}

html[lang="fa"] .sz-stop-title,
html[dir="rtl"] .sz-stop-title {
  font-size: 1.22rem;
  line-height: 1.35;
}

html[lang="fa"] .sz-stop-body,
html[dir="rtl"] .sz-stop-body {
  line-height: 1.75;
}

html[lang="fa"] .sz-route-lede,
html[dir="rtl"] .sz-route-lede {
  line-height: 1.75;
}

@keyframes sz-drop {
  0% { top: 2.3rem; opacity: 0; }
  12% { opacity: 1; }
  88% { opacity: 1; }
  100% { top: calc(100% - 2.55rem); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .sz-lane,
  .sz-stop,
  .sz-stops::after,
  .sz-traveler {
    animation: none;
  }

  .sz-traveler,
  .sz-stops::after {
    display: none;
  }
}
</style>
