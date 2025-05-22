<template>
    <v-dialog :value="visible" width="480">
        <v-card rounded="lg">
            <v-card-title>
        {{ dialogTitle }}
        <v-spacer></v-spacer>
        <v-btn
          @click="closeDialog"
          tabindex="-1"
          color="primary"
          class="rounded-lg"
          right
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <!-- <v-card-subtitle>
        Input startup member role
      </v-card-subtitle> -->
      <v-card-text>
       
        <v-form ref="editedForm">
            <v-row dense>
              
                <v-col cols="12" >
                    <v-text-field 
                    v-model="editedItem.role"
                    label="Role"
                    outlined
                    dense
                   :counter="50" 
                 
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-form>

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn  @click="submit" color="primary">{{ $t("dialog.save") }}</v-btn>
      </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default{
    name: "DialogUserEditStartupMember",
    props:{
        visible: Boolean,
        editedItem: { type: Object, default: () => ({
            role:""
        })}
    },
    computed:{
        dialogTitle() {
         return this.$t("user.profile.startup.edit_member") || ""
        },
    },
    methods: {
    closeDialog() {
      this.$emit("update:visible", false);
    },
    submit() {
      if (!this.$refs.editedForm.validate()) return;
      this.$emit("save", this.editedItem);
    },
  },
}
</script>