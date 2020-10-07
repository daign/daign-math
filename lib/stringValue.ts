import { Observable } from '@daign/observable';

/**
 * String value that implements the Observable pattern
 */
export class StringValue extends Observable {
  private _value: string;

  public get value(): string {
    return this._value;
  }

  public set value( value: string ) {
    // Only call observers if something changed
    if ( this._value !== value ) {
      this._value = value;
      this.notifyObservers();
    }
  }

  /**
   * Constructor
   * @param value Value
   */
  public constructor( value?: string ) {
    super();
    this._value = value || '';
  }

  /**
   * Set the values without notifying observers
   * @param value Value
   * @returns A reference to itself
   */
  public setSilent( value: string ): StringValue {
    this._value = value;
    return this;
  }

  /**
   * Create a new string value object with the same value
   * @returns A new string value object
   */
  public clone(): StringValue {
    return new StringValue( this.value );
  }
}
