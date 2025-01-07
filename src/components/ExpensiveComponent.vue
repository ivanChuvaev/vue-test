<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import TimerSinceMounted from './TimerSinceMounted.vue'

const items = ref(
  [...Array(10)].map(() => ({
    key: Math.random(),
    pos: {
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
    },
    bounced: {
      x: false,
      y: false,
    },
    velocity: {
      x: -10 + Math.random() * 20,
      y: -10 + Math.random() * 20,
    },
    radius: 0.3 + Math.random() * 1,
  })),
)

let stopAnimation = false
let prevTimestamp = 0

const defaultConfig = {
  borderOffset: 1,
  timestampDelta: 30,
  center: {
    x: 50,
    y: 50,
  },
  centerWeight: 10,
  centerRotationWeight: 2,
  velocityDamp: 0.99,
  collideDamp: 0.5,
  gravity: 0.1,
}
const alteredConfig = {
  ...defaultConfig,
  centerWeight: 0,
  centerRotationWeight: 0,
}

let animationConfig = defaultConfig
const handleIteration = (timestamp: number) => {
  if (stopAnimation) {
    return
  }
  if (timestamp - prevTimestamp > animationConfig.timestampDelta) {
    prevTimestamp = timestamp
    items.value = items.value.map((item) => {
      const centerDistanceSqr =
        (animationConfig.center.x - item.pos.x) ** 2 + (animationConfig.center.y - item.pos.y) ** 2
      let centerAccel
      let centerRotationAccel
      if (centerDistanceSqr < 10) {
        centerAccel = {
          x: 0,
          y: 0,
        }
        centerRotationAccel = {
          x: 0,
          y: 0,
        }
      } else {
        const centerAccelValue = animationConfig.centerWeight / centerDistanceSqr
        centerAccel = {
          x: (animationConfig.center.x - item.pos.x) * centerAccelValue,
          y: (animationConfig.center.y - item.pos.y) * centerAccelValue,
        }
        centerRotationAccel = {
          x:
            (-(animationConfig.center.y - item.pos.y) / centerDistanceSqr) *
            animationConfig.centerRotationWeight,
          y:
            ((animationConfig.center.x - item.pos.x) / centerDistanceSqr) *
            animationConfig.centerRotationWeight,
        }
      }
      const pos = {
        x: item.pos.x + item.velocity.x,
        y: item.pos.y + item.velocity.y,
      }
      const velocity = {
        x: (item.velocity.x + centerAccel.x + centerRotationAccel.x) * animationConfig.velocityDamp,
        y:
          (item.velocity.y + animationConfig.gravity + centerAccel.y + centerRotationAccel.y) *
          animationConfig.velocityDamp,
      }
      const bounced = { ...item.bounced }
      const previewPos = {
        x: pos.x + velocity.x,
        y: pos.y + velocity.y,
      }
      const offset = animationConfig.borderOffset + item.radius
      if (bounced.x) {
        if (previewPos.x > offset && previewPos.x < 100 - offset) {
          bounced.x = false
        }
      } else {
        if (previewPos.x <= offset || previewPos.x >= 100 - offset) {
          pos.x = previewPos.x <= offset ? offset : 100 - offset
          velocity.x =
            (previewPos.x <= offset ? 1 : -1) * Math.abs(velocity.x) * animationConfig.collideDamp
          bounced.x = true
        }
      }
      if (bounced.y) {
        if (previewPos.y > offset && previewPos.y < 100 - offset) {
          bounced.y = false
        }
      } else {
        if (previewPos.y <= offset || previewPos.y >= 100 - offset) {
          pos.y = previewPos.y <= offset ? offset : 100 - offset
          velocity.y =
            (previewPos.y <= offset ? 1 : -1) * Math.abs(velocity.y) * animationConfig.collideDamp
          bounced.y = true
        }
      }
      return {
        ...item,
        pos,
        velocity,
      }
    })
  }
  window.requestAnimationFrame(handleIteration)
}

let intervalId = 0

onMounted(() => {
  window.requestAnimationFrame(handleIteration)
  intervalId = setInterval(() => {
    animationConfig = animationConfig === defaultConfig ? alteredConfig : defaultConfig
  }, 5000)
})

onUnmounted(() => {
  stopAnimation = true
  clearInterval(intervalId)
})
</script>

<template>
  <div class="expensive-component">
    <div class="timer-wrapper">
      <div class="timer">Time since mounted: <TimerSinceMounted /></div>
    </div>
    <span
      class="random-circle"
      v-for="item in items"
      :key="item.key"
      :style="{ '--x': `${item.pos.x}%`, '--y': `${item.pos.y}%`, '--radius': `${item.radius}%` }"
    >
    </span>
  </div>
</template>

<style scoped>
.expensive-component {
  position: relative;
  aspect-ratio: 1;
  background-color: var(--color-background-soft);
}
.timer-wrapper {
  position: absolute;
  top: 8px;
  left: 0;
  width: 100%;
}
.timer {
  margin: 0 auto;
  width: fit-content;
}
.random-circle {
  --size: 10px;
  --border-offset: 5px;
  position: absolute;
  width: calc(var(--radius) * 2);
  height: calc(var(--radius) * 2);
  border-radius: 50%;
  background-color: var(--color-accent);
  left: var(--x);
  top: var(--y);
  transform: translate(-50%, -50%);
}
</style>
