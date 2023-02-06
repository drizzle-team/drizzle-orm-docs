import spinners from './spinners';

export interface Options {
  width?: string,
  height?: string,
  operator?: string,
  typingSpeed?: number,
  bgColor?: string,
  color?: string,
  whenInView?: boolean,
  disableButtons?: boolean,
  buttonsColor?: string[],
  disableScroll?: boolean,
  border?: {
    width: string,
    color: string,
  },
  borderRadius?: string,
  font?: string
}

interface Data {
  version: number;
  data: ConsoleObjects
}

type ConsoleObjects = Array<ConsoleObjectType>;
type ConsoleObjectType = Input | Output | Frames;
interface Input {
  id: number
  input: string;
  timing: number;
}

interface Output {
  id: number;
  output: string;
  timing: number;
  style?: string | null;
}

interface Frames {
  id: number;
  frames: Frame[];
}

interface Frame {
  value: string;
  style?: string;
  timing: number;
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length: number) {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export class Terminal {
  private data: ConsoleObjects | null;

  private id = generateString(8);

  private i = 0;

  private isRunning = false;

  private timeouts: NodeJS.Timeout[] = [];

  private intervals: NodeJS.Timer[] = [];

  private cb?: () => void;

  constructor(private el: Element, private input: Data | null, private options?: Options) {
    this.data = this.input?.data || null;
  }

  setCallBack(cb: () => void) {
    this.cb = cb;
  }

  public clearTimeout() {
    for (let timeout = 0; timeout < this.timeouts.length; timeout += 1) {
      clearTimeout(this.timeouts[timeout]);
    }
    this.timeouts = [];

    for (let interval = 0; interval < this.intervals.length; interval += 1) {
      clearTimeout(this.intervals[interval]);
    }
    this.intervals = [];

    this.i = 0;
  }

  setData(input: Data) {
    this.data = input.data;
  }

  setOptions(options: Options) {
    this.options = options;
    this.render();
  }

  start(cb?: () => void) {
    this.el.querySelector('.console')!.innerHTML = '';
    this.clearTimeout();
    if (cb) {
      this.cb = cb;
    }
    document.fonts.ready.then(() => {
      this.addElement();
    });
  }

  reset() {
    this.el.querySelector('.console')!.innerHTML = '';
    document.fonts.ready.then(() => {
      this.clearTimeout();
    });
  }

  addOutput() {
    if (this.data) {
      const $console = this.el.querySelector('.console');
      const element = document.createElement('div');
      element.classList.add('output-text');
      element.style.whiteSpace = 'break-spaces';
      element.style.wordBreak = 'break-all';
      this.coverInSpan(
        element,
        (this.data[this.i] as Output)!.output,
        (this.data[this.i] as Output)!.style!,
      );
      if (this.options?.color) {
        element.style.color = this.options?.color;
      }
      $console!.appendChild(element);
      this.scrollFunc();
      if (this.data && this.i !== this.data.length) {
        this.timeouts.push(setTimeout(() => {
          this.addElement();
        }, (this.data[this.i]! as Output).timing));
      } else if (this.cb) {
        this.timeouts.push(setTimeout(() => {
          this.cb!();
        }, (this.data[this.i]! as Output).timing));
      }
    }
  }

  addTyping() {
    if (this.data) {
      const arr = (this.data[this.i] as Input).input.split('');
      const element = document.createElement('div');
      element.style.whiteSpace = 'break-spaces';
      element.style.wordBreak = 'break-all';

      const temp = document.createElement('span');
      temp.setAttribute('id', `operator${this.i}`);

      // $ operator
      const operator = document.createElement('span');
      operator.classList.add('operator');
      if (this.options?.operator === '') {
        operator.innerHTML = '';
      } else if (this.options?.operator && this.options?.operator !== '') {
        operator.innerHTML = `${this.options?.operator} `;
      } else {
        operator.innerHTML = '$ ';
      }

      // cursor
      const cursor = document.createElement('span');
      cursor.classList.add('cursor');
      cursor.style.animation = 'none';
      cursor.innerHTML = '&nbsp;';

      element.appendChild(operator);
      element.appendChild(temp);
      element.appendChild(cursor);
      if (this.options?.color) {
        element.style.color = this.options?.color;
      }
      const $console = this.el.querySelector('.console');
      $console!.appendChild(element);
      const tempSymbol = this.el.querySelector(`#operator${this.i}`);
      arr.forEach((symbol, index: number) => {
        this.timeouts.push(setTimeout(() => {
          tempSymbol!.innerHTML += symbol;
          this.scrollFunc();
          if (index === arr.length - 1) {
            cursor.style.animation = 'blink 0.7s step-start 0s infinite';
            this.timeouts.push(setTimeout(() => {
              element.removeChild(cursor);
            }, (this.data![this.i - 1] as Input).timing / 2));
            if (this.i !== this.data!.length) {
              this.timeouts.push(setTimeout(() => {
                this.addElement();
              }, (this.data![this.i - 1] as Input).timing));
            } else if (this.cb) {
              this.timeouts.push(setTimeout(() => {
                this.cb!();
              }, (this.data![this.i - 1] as Input).timing));
            }
          }
        }, (this.options?.typingSpeed ?? 100) * index));
      });
    }
  }

  addFrame() {
    if (this.data) {
      const { frames } = this.data[this.i] as Frames;
      const element = document.createElement('div');
      element.style.whiteSpace = 'break-spaces';
      element.style.wordBreak = 'break-all';
      if (this.options?.color) {
        element.style.color = this.options?.color;
      }
      const $console = this.el.querySelector('.console');
      $console!.appendChild(element);
      this.nextFrame(element, frames, 0);
    }
  }

  nextFrame(element: HTMLDivElement, frames: Frame[], index: number) {
    if (frames[index]) {
      element.innerHTML = '';
      this.coverInSpan(element, frames[index]!.value, frames[index]!.style!);
      this.scrollFunc();
      this.timeouts.push(setTimeout(() => {
        this.nextFrame(element, frames, index + 1);
      }, frames[index]!.timing));
    } else if (this.data && this.i === this.data.length && this.cb) {
      this.cb();
    } else {
      this.addElement();
    }
  }

  addElement() {
    const spinnerElements = this.el.querySelectorAll('.sp');
    spinnerElements.forEach((el) => { el.remove(); });
    if (this.data) {
      if (this.data[this.i]) {
        if ('output' in this.data[this.i]!) {
          this.addOutput();
        }
        if ('input' in this.data[this.i]!) {
          this.addTyping();
        }
        if ('frames' in this.data[this.i]!) {
          this.addFrame();
        }
      }
      this.i += 1;
    }
  }

  scrollFunc = () => {
    if (!this.options?.disableScroll) {
      const $console = this.el.querySelector('.console');
      if ($console) {
        $console.scrollTo({ top: $console.scrollHeight });
      }
    }
  };

  // Gradient generator
  hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
    if (result) {
      return {
        r: parseInt(result[1]!, 16),
        g: parseInt(result[2]!, 16),
        b: parseInt(result[3]!, 16),
      };
    }
    return null;
  }

  splitToChunks(array: any, parts: number) {
    const result = [];
    for (let i = parts; i > 0; i -= 1) {
      result.push(array.splice(0, Math.ceil(array.length / i)));
    }
    return result;
  }

  calculateColors = (colors: string[], totalSteps: number) => {
    const arr = [];
    for (let i = 0; i < totalSteps - colors.length; i += 1) {
      arr.push(i);
    }
    let colorizedArray: any[] = [];
    const newArr = this.splitToChunks(arr, colors.length - 1);
    for (let i = 0; i < colors.length - 1; i += 1) {
      const smallArr = this.getArray(colors[i], colors[i + 1], newArr[i].length);
      if (i !== 0) {
        smallArr.shift();
      }
      colorizedArray = [...colorizedArray, ...smallArr];
    }
    return colorizedArray.map((color) => this.rgbToHex(color.r, color.g, color.b));
  };

  rgbToHex(r: number, g: number, b: number) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  getArray = (color1: any, color2: any, steps: number) => {
    const array: any = [];
    color1 = this.hexToRgb(color1);
    color2 = this.hexToRgb(color2);
    for (let i = 0; i < steps; i += 1) {
      array.push({
        r: null, g: null, b: null,
      });
    }
    for (const key in color1) {
      for (let i = 0; i < steps; i++) {
        if (color1[key] > color2[key]) {
          const step = (color1[key] - color2[key]) / (steps + 1);
          array[i][key] = Math.round(color1[key] - step * (i + 1));
        }
        if (color1[key] < color2[key]) {
          const step = (color2[key] - color1[key]) / (steps + 1);
          array[i][key] = Math.round(color1[key] + step * (i + 1));
        }
        if (color1[key] === color2[key]) {
          array[i][key] = color1[key];
        }
      }
    }
    array.unshift({
      r: color1.r,
      g: color1.g,
      b: color1.b,
    });
    array.push({
      r: color2!.r,
      g: color2!.g,
      b: color2!.b,
    });
    return array;
  };

  coverInSpan = (element: HTMLDivElement, itemValue: string, itemStyle: string) => {
    const styleStr = itemStyle;
    if (styleStr && typeof styleStr === 'string') {
      const arrStyle = styleStr.split(';').map((item) => item.split(':'));
      let scrollRange = 0;
      let str = itemValue;
      const arr = [];
      const styledElementsIndex: number[] = [];
      arrStyle.forEach((style) => {
        const start = +style[0]! - scrollRange;
        const end = +style[1]! - scrollRange;
        const firstPart = str.substring(0, start);
        const secondPart = str.substring(start, end);
        scrollRange += str.substring(0, end).length;
        str = str.substring(end);
        arr.push(firstPart, secondPart);
        styledElementsIndex.push(arr.length - 1);
      });
      if (str) {
        arr.push(str);
      }
      arr.forEach((itm, idx) => {
        const foundIndex = styledElementsIndex.findIndex((i) => i === idx);
        if (foundIndex !== -1) {
          const colors = arrStyle[foundIndex]!.slice(2);
          if (colors[0] !== 'sp') {
            if (colors.length === 1) {
              const el = document.createElement('span');
              el.innerText = itm;
              el.style.color = `#${arrStyle[foundIndex]!.slice(2)[0]!}`;
              element.appendChild(el);
            } else {
              const arrOfGradient = this.calculateColors(colors, itm.length);
              arrOfGradient.forEach((color, index) => {
                const el = document.createElement('span');
                el.innerText = itm[index]!;
                el.style.color = color;
                element.appendChild(el);
              });
            }
          } else {
            const el = document.createElement('span');
            el.className = 'sp';
            let j = 0;
            // @ts-ignore
            const obj = spinners[colors[1]];
            element.appendChild(el);

            this.intervals.push(setInterval(() => {
              el.textContent = obj.frames[j]!;
              j += 1;
              if (j >= obj.frames.length) {
                j = 0;
              }
            }, obj.interval));
          }
        } else {
          element.appendChild(document.createTextNode(itm));
        }
      });
    } else {
      element.appendChild(document.createTextNode(itemValue));
    }
  };

  render() {
    if (this.options?.whenInView) {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      };
      const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        entries.forEach((entry:any) => {
          if (entry.intersectionRatio > 0.5) {
            this.start(this.cb);
            observer.disconnect();
          }
        });
      };
      const observer = new IntersectionObserver(callback, options);
      observer.observe(this.el);
    }
    this.el.innerHTML = `
            <style>
            #terminal-${this.id},.console{color:#fff;width:max-content;font-family:${this.options?.font ? `${this.options.font},` : ''} monospace;font-display: swap;}#terminal-${this.id}{overflow-x:auto;background-color:${this.options?.bgColor ?? '#06182c'};display:flex;flex-direction:column;border-radius:${this.options?.borderRadius || '5px'}}.dots{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-items:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;text-align:center;height:34px;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.dots div{width:12px;margin-left:8px;height:12px;border-radius:50%}.console{font-size:14px;line-height:16px;overflow:auto;-webkit-flex:1 1;-ms-flex:1 1;flex:1 1;margin:13px 14px;-webkit-scrollbar-width:none;-moz-scrollbar-width:none;-ms-scrollbar-width:none;scrollbar-width:none}.console::-webkit-scrollbar{display:none}.operator{color:green}.cursor{line-height:11px;font-size:11px;display:inline-block;animation:.7s step-start infinite blink;background-color:green;outline:1px green solid;}.output-text,.command-line{white-space:break-spaces;word-break:break-all}@keyframes blink{50%{background-color:transparent}}
            </style>
            <div data-simplebar id="terminal-${this.id}" style="width:${this.options?.width ?? '500px'}; 
                background-color: ${this.options?.bgColor ?? '#06182c'};
                border: ${this.options?.border?.width ?? '0'}px solid ${this.options?.border?.color ?? 'none'};
            ">
                ${this.options?.disableButtons ? '' : `<div class="dots">
                    <div style="background-color: ${(this.options?.buttonsColor && this.options?.buttonsColor[0]) ?? 'rgb(255, 95, 87)'}; margin-left: 12px;"></div>
                    <div style="background-color: ${(this.options?.buttonsColor && this.options?.buttonsColor[1]) ?? 'rgb(254, 188, 46)'};"></div>
                    <div style="background-color: ${(this.options?.buttonsColor && this.options?.buttonsColor[2]) ?? 'rgb(40, 200, 64)'};"></div>
                </div>`}
                <div class="console" style="min-height:${this.options?.height ?? '300px'};"/>
            </div> 
        `;
  }
}

export default Terminal;
