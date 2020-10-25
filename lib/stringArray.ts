import { GenericArray } from './genericArray';
import { StringValue } from './stringValue';

/**
 * Class for arrays of strings implementing the observable pattern.
 */
export class StringArray extends GenericArray<StringValue> {
  /**
   * Constructor.
   */
  public constructor() {
    super();
  }

  /**
   * Create an array with the same elements.
   * @returns A new array.
   */
  public clone(): StringArray {
    const arr = new StringArray();
    arr.elements = this.elements;
    return arr;
  }

  /**
   * Create an array with copies of the elements.
   * @returns A new array.
   */
  public cloneDeep(): StringArray {
    const arr = new StringArray();
    arr.elements = this.elements.map( ( element: StringValue ): StringValue => element.clone() );
    return arr;
  }
}
