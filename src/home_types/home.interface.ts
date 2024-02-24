//use interfaces for home types so app won't need instances

export interface BaseHomes {
    name: string;
    description: string;
  }
  
  export interface Home extends BaseHomes {
    id: number;

  }