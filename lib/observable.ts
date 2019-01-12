/**
 * Basic implementation of observable pattern.
 */
export abstract class Observable {
  // Array of callbacks from the observers
  private listeners: ( () => void )[] = [];

  /**
   * Constructor
   */
  constructor() {}

  /**
   * Notify all observers by calling their callbacks
   */
  protected notifyObservers() {
    this.listeners.forEach( callback => {
      callback();
    });
  }

  /**
   * Add an observer by passing a callback
   * @param callback Callback of the observer
   * @returns A Callback to remove the observer
   */
  public subscribeToChanges( callback: () => void ): () => void {
    this.listeners.push( callback );

    // return callback that removes the listener
    return () => {
      const i = this.listeners.indexOf( callback );
      if ( i > -1 ) {
        this.listeners.splice( i, 1 );
      }
    };
  }

  /**
   * Remove all observers
   */
  protected clearObservers() {
    this.listeners = [];
  }
}
