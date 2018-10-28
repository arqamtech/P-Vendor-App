import { Component } from '@angular/core';
import { DashboardPage } from '../../MainTabs/dashboard/dashboard';
import { OrdersPage } from '../../MainTabs/orders/orders';
import { ScannerPage } from '../../MainTabs/scanner/scanner';
import { InventoryPage } from '../../MainTabs/inventory/inventory';
import { ProfilePage } from '../../MainTabs/profile/profile';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DashboardPage;
  tab2Root = OrdersPage;
  tab3Root = ScannerPage;
  tab4Root = InventoryPage;
  tab5Root = ProfilePage;

  constructor() {

  }
}
