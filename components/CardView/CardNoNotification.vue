<template>
  <v-layout style="min-height: 23.25rem"
            justify-center
            align-center>

    <v-card
        v-if="visible"
        class="text-center"
        color="transparent"
        flat

    >
      <v-card-text>
        <img
            src="~/assets/icons/info.png"
            height="75px"
            class="mb-4"
            alt=""
        />
        <h4>{{cardText}}</h4>
<!--        <p>{{ $t("tap") }} <b>"{{ $t("request_profile") }}" </b>{{ $t("get_started") }}</p>-->
        <v-btn   color="primary"  :href="btnLink" class="mt-2">{{btnText}}</v-btn>
      </v-card-text>

    </v-card>
  </v-layout>
</template>
<script>
export default{
  name: "CardNoNotification",
  props:{
    cardText : String,
    btnText: String,
    btnLink:String,
    visible: Boolean,
  }
}
</script>
