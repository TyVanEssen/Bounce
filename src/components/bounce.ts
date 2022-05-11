// tslint:disable: no-console
// tslint:disable: variable-name
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Bounce extends Vue {


  private readonly radius = 40;
  private readonly height = 600;

  // The 0,0 coordinate is top left of the box
  // positive x is to the right
  // positive y is down
  //
  // (0,0)---------- x
  //   |
  //   |
  //   |
  //   |
  //   y

  private x: number = 300;
  private y: number = 560;

  private dx: number = 10;
  private dy: number = -20;

  private gravity: [number, number] = [0, .98]
  private reflection: number = 1.1

  private get circle(): Element {
    return this.$refs.circle as Element;
  }

  @Prop() private msg!: string;
  public mounted() {
    setInterval(this.bounce, 100);
  }

  public bounce() { // this gets called every x ms -> update the position iteratively
    console.log(`called bounce function`);
    
    let bounced = this.bounceOnEdge(this.reflection)
    this.subjectGravity()
    this.reset_with_new()
    this.updateXY()

    console.log(`after ${this.y}`);
  }

  public get cx() {
    return this.x.toString();
  }

  public get cy() {
    return this.y.toString();
  }

  public reset_with_new(){
    if (Math.abs(this.dx) + Math.abs(this.dy) < 100) return
    
    this.x = 300
    this.y = 300
    this.dx = 0
    this.dy = 0

    this.gravity=[2 * Math.random() - 1, 2* Math.random() - 1]
    this.reflection = 1 + (Math.random() /2)
    console.info(`Reset with new params Gravity ${this.gravity} and Reflection ${this.reflection}`)
  }

  public subjectGravity(){
    this.subjectForce(this.gravity)
  }
  public subjectForce(d : [number, number] = [0,0]){
    this.dx += d[0]
    this.dy += d[1]
  }

  public bounceOnEdge(preserve: number = 1): boolean {
    let inBounds : [boolean, boolean] = this.inBoundingBox()
    this.dx = inBounds[0] ? this.dx : -1 * preserve * this.dx
    this.dy = inBounds[1] ? this.dy : -1 * preserve * this.dy
    return inBounds.every((x => x))
  }

  private inBoundingBox(): [boolean, boolean]{
    let out: [boolean, boolean] = [true, true]

    if (this.x - this.radius < 0 || this.x + this.radius > this.height) out[0] = false
    if (this.y - this.radius < 0 || this.y + this.radius > this.height) out[1] = false

    return out
  }

  private updateXY() {
    this.x = this.x + this.dx
    this.y = this.y + this.dy
  }
}
