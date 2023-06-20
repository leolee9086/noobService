<template>
    <div class="config__tab-container" data-name="bazaar">
        <div class="fn__flex-column" style="height: 100%">
            <div class="fn__flex-1">
                <div :class="`bazaarPanel ${!showReadme?'':'fn__none'}`" data-type="service" data-init="true">
                    <div class="fn__hr--b"></div>
                    <div class="fn__flex">
                        <div class="fn__space"></div>
                        <div class="fn__space"></div>
                        <svg class="svg ft__on-surface fn__flex-center">
                            <use xlink:href="#iconSort"></use>
                        </svg>
                        <div class="fn__space"></div>
                        <select class="b3-select">
                            <option selected="" value="0">更新时间降序</option>
                            <option value="1">更新时间升序</option>
                            <option value="2">下载次数降序</option>
                            <option value="3">下载次数升序</option>
                        </select>
                        <div class="fn__space"></div>
                        <button id="removeAll" 
                        class="b3-button b3-button--outline fn__flex-center fn__size200"
                        @click="重新部署集市()" 
                        >
                            <svg class="svg">
                                <use xlink:href="#iconBerry"></use>
                            </svg>
                            重新部署集市
                        </button>
                    </div>
                    <div id="configBazaarService">
                        <div class="b3-cards">
                            <template v-for="bazaarItemData in bazaarList">
                                <bazaarItem :bazaarItemData="bazaarItemData" @click="showReadme=!showReadme;bazaarPackage=bazaarItemData"></bazaarItem>
                            </template>
                            <div class="fn__flex-1" style="margin-left: 15px;min-width: 342px;"></div>
                        </div>
                    </div>
                </div>
                <bazaarReadme v-if="showReadme" :bazaarPackage="bazaarPackage" @return="showReadme=!showReadme"></bazaarReadme>
            </div>
        </div>
    </div>
</template>
<script setup>
import bazaarItem from './bazaarItem.vue'
import bazaarReadme from './bazaarReadme.vue';
import {ref} from 'vue'
const { bazaarList,plugin } = defineProps(['bazaarList','plugin'])
function 重新部署集市(){
    plugin.部署集市列表()
}
const showReadme=ref(0)
const bazaarPackage = ref('')
</script>