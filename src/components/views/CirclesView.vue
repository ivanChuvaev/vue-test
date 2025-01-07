<script setup lang="ts">
import CircleSelector from '@/components/CircleSelector.vue'
import CommonHeader from '@/components/CommonHeader.vue'
import FadeVisible from '@/components/FadeVisible'
import { ref } from 'vue'

const circleItems = [
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
]
const circleValue = ref<number | null>(1)
</script>

<template>
  <div class="page">
    <CommonHeader text="Circles" />
    <div class="circle-selectors-grid">
      <CircleSelector
        :radius="80"
        :items="['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth']"
      />
      <CircleSelector :radius="180" :items="['good', 'bad', 'hell', 'heaven', 'peace', 'option']" />
      <div class="controllable-circle">
        <CircleSelector :radius="260" v-model="circleValue" :items="circleItems" />
        <span
          v-if="circleValue !== undefined && circleValue !== null"
          class="controllable-circle__value"
        >
          {{ circleItems[circleValue] }}
        </span>
      </div>

      <CircleSelector :rotation="0" :items="['one', 'two', 'three', 'four']" />
    </div>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi autem possimus praesentium
      exercitationem quam. Voluptatum, natus quidem reprehenderit nostrum aliquid quos modi porro,
      dolore vero veniam ea consequatur minus quaerat! Quidem accusamus asperiores excepturi numquam
      obcaecati non! Tempora dolore minus deleniti maxime, laudantium officiis exercitationem
      corrupti quia culpa, fugiat, inventore iure. Ipsa aliquam natus nobis dignissimos! Provident
      natus dolores molestias! Accusamus id, quaerat odit deserunt sapiente, quos sequi facilis
    </p>
    <FadeVisible>
      <CircleSelector
        :items="['01', '02', '03', '04', '05', '06']"
        :radius="70"
        :style="{
          borderRadius: '4px',
          float: 'right',
          margin: '35px',
          marginLeft: '50px',
          color: 'white',
        }"
      />
    </FadeVisible>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi autem possimus praesentium
      exercitationem quam. Voluptatum, natus quidem reprehenderit nostrum aliquid quos modi porro,
      dolore vero veniam ea consequatur minus quaerat! Quidem accusamus asperiores excepturi numquam
      obcaecati non! Tempora dolore minus deleniti maxime, laudantium officiis exercitationem
      corrupti quia culpa, fugiat, inventore iure. Ipsa aliquam natus nobis dignissimos! Provident
      natus dolores molestias! Accusamus id, quaerat odit deserunt sapiente, quos sequi facilis
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt enim repudiandae doloremque amet
      expedita vero ut. Quis, similique suscipit, dignissimos amet tenetur, minus autem veniam earum
      sint tempora dicta. Reiciendis? Id non iure asperiores fugit enim vel consequatur commodi sed
      dolore! Porro nobis, nihil accusamus ratione a non vitae labore temporibus commodi quibusdam
      deserunt in sapiente odio praesentium? Corrupti, sunt?
    </p>
    <FadeVisible>
      <CircleSelector
        :items="['AA', 'BB', 'CC', 'DD', 'EE', 'FF']"
        :radius="70"
        :style="{
          borderRadius: '4px',
          float: 'left',
          margin: '30px',
          marginTop: '35px',
          marginRight: '50px',
          color: 'white',
        }"
      />
    </FadeVisible>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi autem possimus praesentium
      exercitationem quam. Voluptatum, natus quidem reprehenderit nostrum aliquid quos modi porro,
      dolore vero veniam ea consequatur minus quaerat! Quidem accusamus asperiores excepturi numquam
      obcaecati non! Tempora dolore minus deleniti maxime, laudantium officiis exercitationem
      corrupti quia culpa, fugiat, inventore iure. Ipsa aliquam natus nobis dignissimos! Provident
      natus dolores molestias! Accusamus id, quaerat odit deserunt sapiente, quos sequi facilis
    </p>
    <FadeVisible :style="{ margin: '20px 0px' }">
      <p
        :style="{
          backgroundColor: 'red',
          padding: '8px 16px',
          borderRadius: '4px',
          color: 'white',
        }"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iste nostrum veritatis.
        Sapiente autem, voluptate quod, sed doloribus provident corrupti expedita accusantium magni,
        dolor mollitia a dolore consectetur recusandae error? Distinctio reprehenderit quasi aliquid
      </p>
    </FadeVisible>
    <p></p>
    <FadeVisible :style="{ margin: '20px 0px' }">
      <p
        :style="{
          backgroundColor: 'var(--color-background-mute)',
          padding: '8px 16px',
          borderRadius: '4px',
          color: 'var(--color-text)',
        }"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam iste nostrum veritatis.
        Sapiente autem, voluptate quod, sed doloribus provident corrupti expedita accusantium magni,
        dolor mollitia a dolore consectetur recusandae error? Distinctio reprehenderit quasi aliquid
      </p>
    </FadeVisible>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dicta laudantium, iure
      magnam quasi, odit nisi, distinctio doloribus harum et possimus nam excepturi nobis voluptas?
      Illo animi accusamus inventore necessitatibus. Asperiores consequatur soluta ipsa cum
      molestias nulla optio nostrum ducimus at voluptas, cupiditate, commodi quod aliquid
    </p>
  </div>
</template>

<style scoped>
.page {
  margin: 16px;
}
.circle-selectors-grid {
  overflow: hidden;
  display: grid;
  align-items: center;
  justify-items: center;
  padding: 100px 0;
  gap: 120px;
}
@media screen and (min-width: 768px) {
  .circle-selectors-grid {
    grid-template-columns: 1fr 1fr;
  }
}
.controllable-circle {
  position: relative;
}
.controllable-circle__value {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: black;
  background-color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  place-content: center;
  line-height: 50px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.582);
}
</style>
