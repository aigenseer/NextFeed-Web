import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ThemeService} from "../../../service/themeService/ThemeService";
import {LocalStorage} from "../../../lib/LocalStorage";
import p from '../../../../../package.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges{
  dark: boolean = false;
  @Input() visibleSidebar: boolean = false;
  @Input() headerLinkPrefix: string = "";
  @Output() visibleSidebarChange: EventEmitter<boolean> = new EventEmitter();
  constructor(private readonly themeService: ThemeService) {}
  public version: string = p.version;

  ngOnInit(): void {
    let themeMode = LocalStorage.getOrDefault("theme-mode", "light");
    this.dark = themeMode === "dark";
    this.themeService.switchTheme(themeMode);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.hasOwnProperty("visibleSidebar")){
      this.visibleSidebar = changes.visibleSidebar.currentValue;
    }
  }

  getHeaderLink(){
    return "/"+this.headerLinkPrefix;
  }

  onChangeMode() {
    this.dark = !this.dark;
    let themeMode = this.dark? "dark": "light";
    LocalStorage.set("theme-mode", themeMode);
    this.themeService.switchTheme(themeMode)
  }

  onCloseSidebar() {
    this.visibleSidebar = !this.visibleSidebar;
  }

  onHideSidebar() {
    this.visibleSidebarChange.emit(this.visibleSidebar);
  }

  onShowSidebar() {
    this.visibleSidebarChange.emit(this.visibleSidebar);
  }
}
