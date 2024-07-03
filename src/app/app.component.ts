import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import {
  LangChangeEvent,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    MenubarModule,
    AvatarModule,
    BadgeModule,
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ConfirmationService],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'testAngular';

  items: MenuItem[] | undefined;
  lang: string = 'pt';

  constructor(
    public translate: TranslateService,
    public primeNGConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService
  ) {
    translate.addLangs(['en', 'pt']);
    translate.setDefaultLang('pt');

    const browserLang = translate.getBrowserLang();
    let lang = browserLang?.match(/en|pt/) ? browserLang : 'en';
    this.changeLang(lang);
  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }

  buildUserProfileMenu(): MenuItem[] {
    const menu: MenuItem[] = [
      {
        label: this.translate.instant('menu.home'),
        icon: 'pi pi-home',
      },
      {
        label: 'Set PT',
        icon: 'pi pi-star',
        command: () => {
          this.changeLang('pt');
        },
      },
      {
        label: 'Set EN',
        icon: 'pi pi-star',
        command: () => {
          this.changeLang('en');
        },
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Core',
            icon: 'pi pi-bolt',
            shortcut: '⌘+S',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
            shortcut: '⌘+B',
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
            shortcut: '⌘+U',
          },
          {
            separator: true,
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
            items: [
              {
                label: 'Apollo',
                icon: 'pi pi-palette',
                badge: '2',
              },
              {
                label: 'Ultima',
                icon: 'pi pi-palette',
                badge: '3',
              },
            ],
          },
        ],
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        badge: '3',
      },
    ];
    return menu;
  }
  languageSubscription: any;

  ngOnInit(): void {
    this.languageSubscription = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => (this.items = this.buildUserProfileMenu())
    );
  }

  ngOnDestroy(): void {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}
