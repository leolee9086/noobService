<template>
    <div data-obj="{&quot;bazaarType&quot;:&quot;icons&quot;,&quot;themeMode&quot;:&quot;&quot;,&quot;updated&quot;:&quot;2023-05-30T03:39:40Z&quot;,&quot;name&quot;:&quot;icon-sample&quot;,&quot;repoURL&quot;:&quot;https://github.com/siyuan-note/icon-sample&quot;,&quot;repoHash&quot;:&quot;41df2e8eb11a3fec26318a625cf5adf08e710075&quot;,&quot;downloads&quot;:47,&quot;downloaded&quot;:false}"
        class="b3-card b3-card--wrap">
        <div class="b3-card__img">
            <img :src="bazaarItemData.icon"
                onerror="this.src='https://oss.b3logfile.com/package/siyuan-note/icon-sample@41df2e8eb11a3fec26318a625cf5adf08e710075/preview.png?imageView2/2/w/436/h/232'">
        </div>
        <div class="fn__flex-1 fn__flex-column">
            <div class="b3-card__info fn__flex-1">
               {{bazaarItemData.name  }}  <span class="ft__on-surface ft__smaller">{{bazaarItemData.name}}</span>
                <div class="b3-card__desc" title="这是一个图标示例">
                    {{bazaarItemData.name}}
                </div>
            </div>
            <div class="b3-card__actions">
                <span class="block__icon block__icon--show ft__primary">
                    <svg>
                        <use xlink:href="#iconDownload"></use>
                    </svg>
                    <span class="fn__space"></span>
                    {{bazaarItemData.downloadConut}}
                </span>
                <span class="fn__space"></span>
                <a target="_blank" :href="bazaarItemData.sponsor" data-type="a" class="block__icon block__icon--show"
                    aria-label="给开发者捐赠 {{bazaarItemData.sponsor}}"><svg class="ft__pink">
                        <use xlink:href="#iconHeart"></use>
                    </svg></a><span class="fn__space"></span>
                <div class="fn__flex-1"></div>
                <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show fn__none" data-type="uninstall"
                    aria-label="卸载">
                    <svg>
                        <use xlink:href="#iconTrashcan"></use>
                    </svg>
                </span>
                <div class="fn__space fn__none"></div>
                <span class="b3-tooltips b3-tooltips__nw block__icon block__icon--show fn__none" data-type="switch"
                    aria-label="使用">
                    <svg>
                        <use xlink:href="#iconSelect"></use>
                    </svg>
                </span>
                <div class="fn__space fn__none"></div>
                <span data-type="install-t" class="b3-tooltips b3-tooltips__nw block__icon block__icon--show fn__none"
                    aria-label="更新">
                    <svg class="ft__primary">
                        <use xlink:href="#iconRefresh"></use>
                    </svg>
                </span>
            </div>
        </div>
    </div>
</template>
<script setup>
    const {bazaarItemData} = defineProps(['bazaarItemData']) 
    console.log('aaa',bazaarItemData)
</script>