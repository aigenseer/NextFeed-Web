import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../../service/themeService/ThemeService";
import {LocalStorage} from "../../../lib/LocalStorage";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  dark: boolean = false;

  constructor(private readonly themeService: ThemeService) {}

  ngOnInit(): void {
    let themeMode = LocalStorage.getOrDefault("theme-mode", "light");
    this.dark = themeMode === "dark";
    this.themeService.switchTheme(themeMode);
  }

  onChangeMode() {
    let themeMode = this.dark? "dark": "light";
    LocalStorage.set("theme-mode", themeMode);
    this.themeService.switchTheme(themeMode)
  }
}
