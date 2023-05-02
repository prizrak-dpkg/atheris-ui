<template>
  <div>
    <ModelLoading v-show="loading" :radio="box"></ModelLoading>
    <div v-show="!loading" ref="containerRef" class="container"></div>
  </div>
</template>

<script lang="ts">
import { Ref, defineComponent, onMounted, ref, watch, computed } from "vue";
import * as THREE from "three";
import * as CONTROLS from "three/examples/jsm/controls/OrbitControls.js";
import * as GLTFLOADER from "three/examples/jsm/loaders/GLTFLoader.js";
import * as RGBELoader from "three/examples/jsm/loaders/RGBELoader.js";
import tShirtModel from "@/assets/3d_models/t-shirt.glb";
import hoodieModel from "@/assets/3d_models/hoodie.glb";
import sceneHDRI from "@/assets/3d_models/scene.hdr";
import ModelLoading from "./Loading.vue";
import { DesignModeEnum } from "../../shared/types/index";

export default defineComponent({
  name: "3DModel",
  props: {
    radio: {
      type: Number,
      required: true,
    },
    primaryColor: {
      type: String,
      required: true,
    },
    secondColor: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: true,
    },
  },
  components: {
    ModelLoading,
  },
  setup(props) {
    const containerRef: Ref<HTMLDivElement | undefined> = ref();
    const box = computed(() => props.radio);
    const mesh: Ref<THREE.Mesh | undefined> = ref(undefined);
    const color = computed(
      () => `${props.primaryColor}_${props.secondColor}.png`
    );
    const loading = ref(false);
    const changeColor = (color: string) => {
      if (mesh.value !== undefined) {
        const textureLoader = new THREE.TextureLoader();

        import(
          `@/assets/3d_models/textures/${props.mode}/metalnessRoughnessMap.png`
        ).then((rmMap) => {
          import(`@/assets/3d_models/textures/${props.mode}/${color}`).then(
            (texture) => {
              textureLoader.load(rmMap.default, (map) => {
                textureLoader.load(texture.default, (texture) => {
                  if (mesh.value !== undefined) {
                    const material = new THREE.MeshPhysicalMaterial();
                    map.flipY = false;
                    map.wrapS = THREE.RepeatWrapping;
                    map.wrapT = THREE.RepeatWrapping;
                    texture.encoding = THREE.sRGBEncoding;
                    texture.flipY = false;
                    material.clearcoatNormalScale = new THREE.Vector2(1, -1);
                    material.normalScale = new THREE.Vector2(1, -1);
                    material.ior = 1;
                    material.roughnessMap = map;
                    material.metalnessMap = map;
                    material.roughness = 1;
                    material.metalness = 1;
                    material.map = texture;
                    material.map.wrapS = THREE.RepeatWrapping;
                    material.map.wrapT = THREE.RepeatWrapping;
                    material.map.repeat.set(1, 1);
                    material.metalness = 1;
                    material.side = 2;
                    mesh.value.material = material;
                  }
                });
              });
            }
          );
        });
      }
    };
    const renderModel = (radio: number) => {
      if (radio > 0 && loading.value === false) {
        loading.value = true;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 4;
        const renderer = new THREE.WebGLRenderer({
          antialias: true,
        });
        renderer.setSize(radio, radio);
        renderer.setClearColor(0xf4f4f4);
        renderer.shadowMap.enabled = true;
        if (containerRef.value) {
          containerRef.value.innerHTML = "";
          containerRef.value.appendChild(renderer.domElement);
          const canvas = containerRef.value.querySelector("canvas");
          if (canvas) {
            canvas.style.borderRadius = "20px";
          }
        }
        camera.position.z = 5;
        const controls = new CONTROLS.OrbitControls(
          camera,
          renderer.domElement
        );
        controls.enablePan = false;
        controls.minDistance = 2;
        controls.maxDistance = 4;
        const gltfLoader = new GLTFLOADER.GLTFLoader();
        const rgbeLoader = new RGBELoader.RGBELoader();
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.5;
        rgbeLoader.load(sceneHDRI, (dataTexture) => {
          dataTexture.mapping = THREE.EquirectangularReflectionMapping;
          scene.environment = dataTexture;
          const model =
            props.mode === DesignModeEnum.Hoodie ? hoodieModel : tShirtModel;
          gltfLoader.load(model, (gltf) => {
            const model = gltf.scene;
            scene.add(model);
            const object = model.getObjectByName(props.mode);
            if (object) mesh.value = object as THREE.Mesh;
            changeColor(color.value);
            loading.value = false;
          });
        });
        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };
        animate();
      }
    };
    watch(box, (newValue) => {
      renderModel(newValue);
    });
    watch(color, (newValue) => {
      changeColor(newValue);
    });
    onMounted(() => {
      renderModel(box.value);
    });
    return {
      containerRef,
      box,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;

  & > canvas {
    border-radius: 20px;
  }
}
</style>
