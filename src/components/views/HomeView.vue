<script setup lang="ts">
import CommonHeader from '@/components/CommonHeader.vue'
import LongForm from '@/components/forms/LongForm.vue'
import RegisterForm from '@/components/forms/RegisterForm.vue'
import UserForm from '@/components/forms/UserForm.vue'
import { globalStore } from '@/stores/global-store'
import { ModalConfigType, modalStore } from '@/stores/modal-store'
import ColorBox from '@/components/ColorBox.vue'
import ParallaxImage from '@/components/ParallaxImage.vue'
import ModalTest from '@/components/ModalTest.vue'
import StarSelector from '../inputs/StarSelector.vue'
</script>

<template>
  <main class="home-page">
    <CommonHeader
      text="Home"
      @decrement="globalStore.decrement()"
      @increment="globalStore.increment()"
    />
    <div class="home-buttons-grid">
      <button
        @click="
          () =>
            modalStore.open({
              type: ModalConfigType.SIMPLE,
              component: UserForm,
              modalProps: {
                onBack: () => console.log('modal back pressed'),
                onClose: () => console.log('modal closed'),
              },
              props: { onSave: () => console.log('nice') },
            })
        "
      >
        open user form
      </button>
      <button
        @click="() => modalStore.open({ type: ModalConfigType.SIMPLE, component: RegisterForm })"
      >
        open register form
      </button>
      <button @click="() => modalStore.open({ type: ModalConfigType.SIMPLE, component: LongForm })">
        open long form
      </button>
      <button @click="() => modalStore.open({ type: ModalConfigType.RAW, component: LongForm })">
        open long form in raw modal
      </button>
      <button @click="() => modalStore.open({ type: ModalConfigType.RAW, component: RegisterForm })">
        open register form in raw modal
      </button>
      <button @click="() => modalStore.open({ type: ModalConfigType.RAW, component: UserForm })">
        open user form in raw modal
      </button>
      <button @click="() => modalStore.open({ type: ModalConfigType.SIMPLE, component: ModalTest })">modal test</button>
    </div>
    <ColorBox color="aquamarine" />
    <div>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. In earum maiores vero ut facere? A
      adipisci accusamus deserunt nulla libero iusto doloribus suscipit eligendi assumenda
      consectetur ipsa, repellendus exercitationem ea. Quae, sed ex! Deserunt, libero perspiciatis
      necessitatibus laboriosam esse ipsa, doloremque quam sit incidunt nobis laborum, dolore saepe
      tenetur aperiam qui illum soluta quisquam sed obcaecati illo odio aliquam quibusdam! Impedit,
      ducimus perspiciatis aliquid numquam porro repellendus in iure minima necessitatibus
      asperiores, hic vitae doloremque inventore repellat? In, eligendi. Aspernatur pariatur fugiat
      recusandae vitae nam minus atque expedita itaque sunt? Nam debitis iusto ipsum. Quis dolore
      obcaecati veniam nulla deleniti pariatur consequatur aliquam soluta dolores nemo inventore nam
      fuga ad, sequi totam delectus cupiditate sunt rem aperiam ullam voluptate fugit. Vitae quis
      eius quibusdam? Aperiam, id, ipsum ut recusandae voluptatem repudiandae sed veniam corrupti
      minima, neque quod temporibus nemo sit. Sequi eligendi nostrum fuga dolorum non odit
      laudantium id quidem. Amet fugiat inventore minus esse. Dolorum nobis accusamus, fugiat cum
      illo ipsa in harum dignissimos odio nihil, voluptatum veritatis omnis velit eos illum ut, aut
      et! Eaque tempora a autem. Aliquid, laborum nihil neque blanditiis reiciendis repudiandae! Cum
      amet consequuntur eaque, illo modi aut. Accusamus, omnis quisquam aliquam ducimus tempora
      pariatur ut minima cumque, ea et sequi fugit eveniet aliquid? Officiis voluptas debitis illum
      perferendis aliquam architecto assumenda. Reprehenderit suscipit quisquam deleniti earum
      repellendus optio accusantium, voluptatem placeat quasi nulla consectetur incidunt omnis
      ducimus nemo vero nostrum, id iure quidem! Tenetur inventore vel asperiores, odio debitis
      eligendi, sed reiciendis molestiae delectus earum hic doloribus rem. Unde laudantium
      exercitationem quae, similique esse omnis, eligendi, porro ea quod at et minus? Voluptatem.
      Consequuntur amet ullam impedit corporis! Nulla, pariatur veritatis consequatur voluptates et
      cupiditate amet repudiandae? Officia, ea architecto a autem ullam atque vel, dolor saepe, aut
      enim expedita tempore culpa nisi!
    </div>
    <ColorBox color="bisque" />
    <ParallaxImage src="images/moon.jpg" :delta="1" :style="{ margin: '16px -16px' }" />
    <div>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. In earum maiores vero ut facere? A
      adipisci accusamus deserunt nulla libero iusto doloribus suscipit eligendi assumenda
      consectetur ipsa, repellendus exercitationem ea. Quae, sed ex! Deserunt, libero perspiciatis
      necessitatibus laboriosam esse ipsa, doloremque quam sit incidunt nobis laborum, dolore saepe
      tenetur aperiam qui illum soluta quisquam sed obcaecati illo odio aliquam quibusdam! Impedit,
      ducimus perspiciatis aliquid numquam porro repellendus in iure minima necessitatibus
      asperiores, hic vitae doloremque inventore repellat? In, eligendi. Aspernatur pariatur fugiat
      recusandae vitae nam minus atque expedita itaque sunt? Nam debitis iusto ipsum. Quis dolore
      obcaecati veniam nulla deleniti pariatur consequatur aliquam soluta dolores nemo inventore nam
      fuga ad, sequi totam delectus cupiditate sunt rem aperiam ullam voluptate fugit. Vitae quis
      eius quibusdam? Aperiam, id, ipsum ut recusandae voluptatem repudiandae sed veniam corrupti
      minima, neque quod temporibus nemo sit. Sequi eligendi nostrum fuga dolorum non odit
      laudantium id quidem. Amet fugiat inventore minus esse. Dolorum nobis accusamus, fugiat cum
      illo ipsa in harum dignissimos odio nihil, voluptatum veritatis omnis velit eos illum ut, aut
      et! Eaque tempora a autem. Aliquid, laborum nihil neque blanditiis reiciendis repudiandae! Cum
      amet consequuntur eaque, illo modi aut. Accusamus, omnis quisquam aliquam ducimus tempora
      pariatur ut minima cumque, ea et sequi fugit eveniet aliquid? Officiis voluptas debitis illum
      perferendis aliquam architecto assumenda. Reprehenderit suscipit quisquam deleniti earum
      repellendus optio accusantium, voluptatem placeat quasi nulla consectetur incidunt omnis
      ducimus nemo vero nostrum, id iure quidem! Tenetur inventore vel asperiores, odio debitis
      eligendi, sed reiciendis molestiae delectus earum hic doloribus rem. Unde laudantium
      exercitationem quae, similique esse omnis, eligendi, porro ea quod at et minus? Voluptatem.
      Consequuntur amet ullam impedit corporis! Nulla, pariatur veritatis consequatur voluptates et
      cupiditate amet repudiandae? Officia, ea architecto a autem ullam atque vel, dolor saepe, aut
      enim expedita tempore culpa nisi!
    </div>
    <ParallaxImage src="images/mountain.jpg" :delta="0.8" :style="{ margin: '16px -16px', height: '600px' }" />
    <ColorBox color="bisque" />
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, tenetur. Minima cupiditate
      molestiae ipsam tempore nihil doloremque ipsa rerum, perspiciatis esse saepe excepturi
      adipisci aperiam dicta tempora maiores dolore numquam! Quasi natus placeat consequuntur
      doloremque dignissimos ea! A neque ut blanditiis, dolores repellat quo provident quisquam quas
      quidem laboriosam harum unde, eveniet consectetur placeat voluptas et sapiente, doloremque
      porro. Eligendi? Soluta quo doloremque delectus tempore reprehenderit id eius incidunt enim ea
      molestiae aliquid veniam consequatur maxime assumenda eaque iste eum aut dolorum repellendus
      dolore dignissimos, accusantium sed? Distinctio, ipsam nisi! Dicta temporibus minima
      accusamus, sapiente debitis praesentium inventore. Rerum eaque voluptas maxime quas
      exercitationem? Sapiente odio ratione rerum, deserunt enim dolorum ipsa dolore, quas nihil in
      laboriosam ullam quisquam nemo. Quasi exercitationem ratione veritatis. Quisquam, corrupti!
      Natus cum, aliquam mollitia harum deserunt, facilis ipsam distinctio esse placeat earum facere
      eum consequuntur reprehenderit quibusdam tempora atque, officiis molestiae temporibus modi
      sint. Quae assumenda beatae a quaerat voluptatem earum laudantium mollitia natus laboriosam
      vitae! Consectetur fuga tempore blanditiis debitis ducimus et cupiditate eum eligendi at eius.
      Totam voluptate labore tenetur saepe quae? Quibusdam cumque blanditiis aspernatur impedit
      porro deserunt quos sint! Expedita, atque? Harum enim voluptatem voluptatum, temporibus
      voluptatibus itaque ipsa nulla eius provident facere consectetur maiores repellat.
      Necessitatibus illo tenetur voluptate? Neque ad vero ullam, culpa repudiandae nisi rem.
      Reprehenderit architecto rerum iure corporis neque cupiditate at consequatur quibusdam quae
      illo, voluptatum possimus aliquam excepturi aspernatur, eligendi deleniti error officiis sit.
      Ullam facere cupiditate quae ex neque illo fugit placeat ratione. Sint obcaecati optio aliquid
      provident aliquam beatae quis, quisquam, voluptate, tenetur delectus nostrum quaerat. Sapiente
      soluta quos dicta molestias voluptate! Unde, ullam consequuntur. Facere tempora sit facilis
      nesciunt dicta totam in esse dolorem quidem? Atque neque, dolor quaerat expedita quibusdam
      excepturi velit culpa voluptatum earum temporibus et vitae, cum tempore.
    </div>
    <ColorBox color="blue" />
  </main>
</template>

<style scoped>
.home-page {
  margin: 16px;
}
.home-buttons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin: 18px 0px;
}
</style>
