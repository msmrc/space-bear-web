import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as THREE from "three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import Stats from 'three/examples/jsm/libs/stats.module'

@Component({
  selector: 'app-bear',
  templateUrl: './bear.component.html',
  styleUrls: ['./bear.component.scss']
})
export class BearComponent implements OnInit, AfterViewInit {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  scene: any = null;
  camera: any = null;
  controls: any = null;

  public modelReady = false
  public mixer!: THREE.AnimationMixer;
  public animationActions: THREE.AnimationAction[] = []
  public activeAction: THREE.AnimationAction | null = null;
  public lastAction!: THREE.AnimationAction
  public clock = new THREE.Clock();

  // настройки canvas
  public height = 400;
  public width = 400;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(20, this.width / this.height, 1, 1000);
  }

  ngOnInit(): void {
  }
  public makeFirst() {
    this.setAction(this.animationActions[0])
  }
  public makeDance() {
    this.setAction(this.animationActions[1])
  }
  public makeDanceSecond() {
    this.setAction(this.animationActions[2])
  }
  // public makeDefault() {
  //   this.setAction(this.animationActions[0])
  // }

  ngAfterViewInit() {
    this.configCamera();
    this.configRenderer();

    this.createScene();
    this.createControls();

    this.setLight();

    this.render();
  }

  configCamera() {
    this.camera.position.set(0, 100, 100);
  }

  configRenderer() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    // this.renderer.setClearColor(new THREE.Color('hsl(0, 0%, 10%)'));
    this.renderer.setSize(this.width, this.height);
    this.renderer.domElement.style.display = 'block';
    this.renderer.domElement.style.margin = 'auto';
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  createScene() {
    let scene1 = new THREE.Scene();
    let loader = new FBXLoader();

    const animationActions1: THREE.AnimationAction[] = []

    loader.load('../../../../assets/models/Talking.fbx', (object) => {
      object.scale.set(0.04, 0.04, 0.04)
      // Add default animation
      this.mixer = new THREE.AnimationMixer(object)
      const animationAction2 = (this.mixer as THREE.AnimationMixer).clipAction(
        (object as THREE.Object3D).animations[0]
      )
      animationActions1.push(animationAction2)

      // Add Exist animation
      const anim = new FBXLoader();
      anim.load('../../../../assets/models/BreathingIdle.fbx', (anim) => {
        const animationAction3 = (this.mixer as THREE.AnimationMixer).clipAction(
          (anim as THREE.Object3D).animations[0]
        )
        animationActions1.push(animationAction3)


        const anim2 = new FBXLoader();
        anim2.load('../../../../assets/models/Waving.fbx', (anim2) => {
          const animationAction4 = (this.mixer as THREE.AnimationMixer).clipAction(
            (anim2 as THREE.Object3D).animations[0]
          )
          animationActions1.push(animationAction4)
          this.setAction(animationAction4)
          this.modelReady = true;
        })
      })

      scene1.add(object)
    });

    this.animationActions = animationActions1;
    this.scene = scene1;
  }

  // Готово
  setLight() {
    let ambient = new THREE.AmbientLight(0xffffff, 1.0);

    let keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(20, 100%, 75%)'), 1.0);
    keyLight.position.set(-100, 0, 100);

    let fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
    fillLight.position.set(100, 0, 100);

    let backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(100, 0, -100).normalize();

    this.scene.add(ambient);
    this.scene.add(keyLight);
    this.scene.add(fillLight);
    this.scene.add(backLight);
  }

  // Готово
  render() {
    window.requestAnimationFrame(() => this.render());
    if (this.modelReady && this.mixer) {
      this.mixer?.update(this.clock.getDelta())
    }
    //this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private createControls = () => {
    const renderer = new CSS2DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    document.body.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.enableRotate = false;
    this.controls.autoRotate = false;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.update();
  };

  public setAction = (toAction: THREE.AnimationAction) => {
    if (toAction != this.activeAction) {
      this.lastAction = this.activeAction as THREE.AnimationAction
      this.activeAction = toAction
      console.log(this.activeAction)

      this.lastAction?.stop()
      this.lastAction?.fadeOut(1)

      this.activeAction.reset()
      this.activeAction.fadeIn(1)
      this.activeAction.play()
    }
  }

}
