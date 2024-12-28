export interface IBreed {
  id: string;
  weight: {
    imperial: string;
    metric: string;
  };
  height: {
    imperial: string;
    metric: string;
  };
  name: string;
  bredFor: string;
  breedGroup: string;
  lifeSpan: string;
  temperament: string;
  origin: string;
  referenceImageId: string;
}

export interface IBreedImage {
  id: string;
  url: string;
  width: number;
  height: number;
  mimeType: string;
  breeds: IBreed[];
}
