<script setup>
import LogoIcon from "@/assets/images/logos/logok.svg";
import Logo from "@/assets/images/logos/logok.svg";

</script>
<template>
  <div class="logo">
    <RouterLink to="/">
      <img :src="Logo" alt="logo" class="mini-text" />
      <img :src="LogoIcon" alt="logo icon" class="mini-icon" />
    </RouterLink>
  </div>
</template>
