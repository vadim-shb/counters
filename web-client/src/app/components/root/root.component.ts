import {Component, OnInit} from "@angular/core";
import {ToastService} from "../../services/toast/toast.service";
import {ToasterConfig} from "angular2-toaster";

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.less']
})
export class RootComponent implements OnInit {

  private toasterConfig: ToasterConfig;
  constructor(private toastService: ToastService) {
    this.toasterConfig = this.toastService.getConfig();
  }

  ngOnInit() {
  }

}
