import {Injectable} from "@angular/core";
import {ToasterConfig, ToasterService} from "angular2-toaster";

@Injectable()
export class ToastService {

  constructor(private toasterService: ToasterService) {
  }

  getConfig(): ToasterConfig {
    return new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: false,
      timeout: 0
    });
  }

  error(header: string, body?: string) {
    console.log(header);
    let toast = this.toasterService.pop('error', header, body);
  }
}
