import {Color} from './color';
import {MathHelper} from './mathHelper';
import {Observable} from './observable';

/**
 * Internal class for a color point in a gradient
 */
class ColorStop extends Observable {
  private _position: number; // from 0 to 1
  private _color: Color | undefined;
  private colorSubscriptionRemover: ( () => void ) | undefined;

  /**
   * Getter for the position value
   * @returns The position value
   */
  public get position(): number {
    return this._position;
  }

  /**
   * Setter for the position value
   * @param value The position value
   */
  public set position( value: number ) {
    value = MathHelper.clamp( value, 0, 1 );

    // only call observers if something changed
    if ( this._position !== value ) {
      this._position = value;
      this.notifyObservers();
    }
  }

  /**
   * Getter for the color value
   * @returns The color value
   */
  public get color(): Color {
    if ( !this._color ) {
      throw new Error( 'Color not defined for color stop.' );
    }
    return this._color;
  }

  /**
   * Constructor
   * @param p The position value
   * @param c The color value
   */
  constructor( p: number, c: Color ) {
    super();

    p = MathHelper.clamp( p, 0, 1 );
    this._position = p;
    // the passed color is used directly, not cloned
    this._color = c;

    // notify observers when color has changes
    const callback = (): void => {
      this.notifyObservers();
    };
    this.colorSubscriptionRemover = this._color.subscribeToChanges( callback );
  }

  /**
   * Clear the non-primitive properties and remove subscriptions
   */
  public clear(): void {
    this._color = undefined;

    if ( this.colorSubscriptionRemover ) {
      this.colorSubscriptionRemover();
      this.colorSubscriptionRemover = undefined;
    }
    this.clearObservers();
  }
}

/**
 * Linear gradient with multiple color stops
 */
export class Gradient extends Observable {
  private _stops: ColorStop[];
  private stopSubscriptionRemovers: Array<() => void>;

  /**
   * Getter for the color stops
   * @returns The color stops
   */
  public get stops(): ColorStop[] {
    return this._stops;
  }

  /**
   * Constructor
   */
  constructor() {
    super();
    this._stops = [];
    this.stopSubscriptionRemovers = [];
  }

  /**
   * Add a new color stop
   * @param position The position value from 0 to 1
   * @param color The color value
   * @returns A reference to itself
   */
  public addColorStop( position: number, color: Color ): Gradient {
    const colorStop = new ColorStop( position, color );
    this._stops.push( colorStop );

    // notify observers when color stop changes
    const callback = (): void => {
      this.sortStops();
      this.notifyObservers();
    };
    this.stopSubscriptionRemovers.push( colorStop.subscribeToChanges( callback ) );

    this.sortStops();
    this.notifyObservers();
    return this;
  }

  /**
   * Calculate the interpolated color at a given position on the gradient
   * @param t The gradient position from 0 to 1
   * @returns The calculated color
   */
  public colorAt( t: number ): Color {
    // search for the index of the lowest stop position bigger than t,
    // or length of array if no stop position is bigger than t
    let u = 0;
    while ( this._stops[ u ] && this._stops[ u ].position < t && u < this._stops.length ) {
      u++;
    }

    if ( u === 0 ) {
      return this._stops[ 0 ].color.clone();
    } else if ( u === this._stops.length ) {
      return this._stops[ this._stops.length - 1 ].color.clone();
    } else {
      const lowerStop = this._stops[ u - 1 ];
      const upperStop = this._stops[ u ];
      const tSection = ( t - lowerStop.position ) / ( upperStop.position - lowerStop.position );

      const result = new Color();
      result.lerp( lowerStop.color, upperStop.color, tSection );
      return result;
    }
  }

  /**
   * Remove all color stops
   * @returns A reference to itself
   */
   public clear(): Gradient {
     // remove change subscriptions on stops
     this.stopSubscriptionRemovers.forEach( ( callback: () => void ): void => {
       callback();
     } );
     this.stopSubscriptionRemovers = [];

     // need to call clear on all ColorStops because they hold references to the color objects
     this._stops.forEach( ( c: ColorStop ): void => {
       c.clear();
     } );
     this._stops = [];

     return this;
   }

  /**
   * Set this gradient to the deep copied color stops of another gradient
   * @param g The other gradient
   * @returns A reference to itself
   */
  public copy( g: Gradient ): Gradient {
    this.clear();

    g.stops.forEach( ( s: ColorStop ): void => {
      this.addColorStop( s.position, s.color.clone() );
    } );

    return this;
  }

  /**
   * Generate a new instance with the same deep copied color stops
   * @returns A new gradient
   */
  public clone(): Gradient {
    return new Gradient().copy( this );
  }

  /**
   * Sorts the color stops
   * @returns A reference to itself
   */
  private sortStops(): Gradient {
    this._stops.sort( ( a: ColorStop, b: ColorStop ): number => {
      if ( a.position < b.position ) {
        return -1;
      } else if ( a.position > b.position ) {
        return 1;
      } else {
        return 0;
      }
    } );
    return this;
  }
}
