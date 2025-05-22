<template>
  <section class="landing-we-do d-flex align-items-center" >
    <v-img
        src="/images/bg2.jpg"
        content-class="landing-program__mask"
        aspect-ratio="unset"
    >
      <v-container class="mb-8">
        <v-card
            color="transparent"
            flat

        >
          <v-card-actions>
            <v-card-title class="text-h4 block-title__text text-break">
              {{ $t("landing.recent_highlights.title") }}
            </v-card-title>
          </v-card-actions>


        </v-card>
        <div class="carousel-wrapper">
          <client-only>
            <carousel v-bind="options"
                      :navigationNextLabel="'❯'"
                      :navigationPrevLabel="'❮'"

            >
              <slide v-for="item in highlights" :key="item.id" class="img-wrapper px-2">
                <CardViewRecentHighlight
                    :title="item.title"
                    :thumbnail="item.thumbnail"
                    @view-detail="previewHighlight(item)"
                />
              </slide>
            </carousel>
          </client-only>
        </div>
      </v-container>
      <DialogPreviewHighlight
          :visible.sync="dialogPreview"
          :detail="preview"
      />
    </v-img>

  </section>


</template>
<script>
export default {
  props:{
    highlights: { type: Array, default: () => []}
  },
  data(){
    return{
      dialogPreview: false,
      preview: null,
      options: {
        autoplay: true,
        loop: true,
        perPage: 1,
        paginationEnabled: false,
        autoplayTimeout: 5000,
        perPageCustom: [[360, 1],[480, 2], [768, 3],[960,4]],
        navigationEnabled: true,
        autoplayHoverPause:true,
      },
    }
  },
  methods:{
    previewHighlight(item) {

      this.preview = Object.assign({}, item);
      this.dialogPreview = true;
    }
  },
  watch: {
    dialogPreview(v) {
      if (!v) {
        // this.preview = null;
      }
    },
  }
}
</script>
