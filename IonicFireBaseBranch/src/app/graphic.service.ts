import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Graphic, Graphics, GraphicName, GRAPHIC_STORAGE, DEFAULT_GRAPH } from './graphics';
@Injectable({
  providedIn: 'root'
})
export class GraphicService {
  CurrentGraphic: Graphic;
  constructor(private storage: Storage) {
    this.readGraphFromStorage();
  }
  getGraphic() {
    return this.CurrentGraphic;
  }
  setGraphic(g: Graphic) {
    this.CurrentGraphic = g;
  }
  readGraphFromStorage() {
    this.storage.get(GRAPHIC_STORAGE).then((g: GraphicName) => {
      console.log('readFromStorage: graphicName: ' + g);
      if (g != null) {
        this.CurrentGraphic = Graphics[g];
      } else { this.CurrentGraphic = DEFAULT_GRAPH; }
    }).catch(error => {
      console.log(error);
    });
  }
  writeGraphToStorage() {
    this.storage.set(GRAPHIC_STORAGE, this.CurrentGraphic.Name).then(() => {
      console.log('written graphic to storage ');
      console.log(Graphics[this.CurrentGraphic.Name]);
    }).catch(error => console.log(error));
  }
}
