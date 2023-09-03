import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import intervalToDuration from 'date-fns/intervalToDuration'
import addMonths from 'date-fns/addMonths'

const LOCAL_STORAGE_KEY = 'finance-helper';
interface Period {
  days: { [dayDate: string]: { amount: number }; };
  periodAmount: number;
  dailyAmount: number;
}

interface Data {
  version: number;
  general: {
    payDate: number;
    monthBudget: number;
    dailyAmount: number;
  }
  data: { [payDateDate: string]: Period };
}
interface SaveSettingsRequest {
  payDate: number;
  periodAmount: number;
  dailyAmount: number;
  spentToday: number;
  monthBudget: number;
}

interface FinanceHelperSettingsForm {
  payDate: FormControl<number>;
  periodAmount: FormControl<number>;
  dailyAmount: FormControl<number>;
  spentToday: FormControl<number>;
  monthBudget: FormControl<number>;
}

function getIsoDate(date: Date = new Date()): string {
  const [withoutT] = date.toISOString().split('T');
  return withoutT;
}

function getPayDateDate(payDate: number) {
  let targetMonth = new Date().getMonth();
  if (new Date().getDate() < payDate) {
    targetMonth--;
  }
  const payDateDate = new Date();
  payDateDate.setMonth(targetMonth);
  payDateDate.setDate(payDate)
  return payDateDate;
}
function getEmptyData(): Data {
  const payDate = 10;
  const monthBudget = 1000;
  const dailyAmount = 50;
  return {
    version: 1,
    general: {
      payDate: payDate,
      monthBudget,
      dailyAmount
    },
    data: {
      [getIsoDate(getPayDateDate(payDate))]: {
        days: {
          [getIsoDate()]: { amount: 0 }
        },
        periodAmount: monthBudget,
        dailyAmount: dailyAmount
      }
    }
  }
}

class FinanceData {
  viewModel: ViewModel = {};

  get data() {
    return this._data;
  }
  constructor(private _data: Data = getEmptyData()) {
    this.updateViewModel();
  }

  touchCurrentPeriod() {
    const data = this.data;
    const payDateIso = getIsoDate(getPayDateDate(data.general.payDate));
    if (!data.data[payDateIso]) {
      data.data[payDateIso] = {
        days: {},
        periodAmount: data.general.monthBudget,
        dailyAmount: data.general.dailyAmount
      }
    }
    return data.data[payDateIso];
  }

  touchCurrentDate() {
    const period = this.touchCurrentPeriod();
    const dayIso = getIsoDate(new Date())
    if (!period.days[dayIso]) {
      period.days[dayIso] = { amount: 0 }
    }
    return period.days[dayIso];
  }

  updateViewModel() {
    const period = this.touchCurrentPeriod();
    const totalSpent = Object.values(period.days).reduce((acc, curr) => {
      acc += curr.amount;
      return acc;
    }, 0);
    const payDateDate = getPayDateDate(this.data.general.payDate);
    const daysToPayday = intervalToDuration({ start: new Date(), end: addMonths(payDateDate, 1) }).days || 0;
    this.viewModel = {
      totalSpent,
      spentToday: this.touchCurrentDate().amount,
      allowedToSpendToday: (period.periodAmount - totalSpent) / daysToPayday,
    }
  }

  addDailySpend(amount: number) {
    const currentDateFinance = this.touchCurrentDate();
    currentDateFinance.amount += amount;
    this.updateViewModel();
  }

  applySettings(request: SaveSettingsRequest) {
    console.log(request);
    const data = this.data;
    data.general.dailyAmount = request.dailyAmount;
    data.general.monthBudget = request.monthBudget;
    data.general.payDate = request.payDate;

    const period = this.touchCurrentPeriod();
    period.dailyAmount = request.dailyAmount;
    period.periodAmount = request.periodAmount;
    this.touchCurrentDate().amount = request.spentToday;
    this.updateViewModel();
  }
}

interface ViewModel {
  spentToday?: number;
  allowedToSpendToday?: number;
  totalSpent?: number;
}

@Component({
  selector: 'app-cypher-helper',
  templateUrl: './finance-helper.component.html',
  styleUrls: ['./finance-helper.component.scss']
})
export class FinanceHelperComponent {
  financeData: FinanceData = new FinanceData();
  financeForm: FormGroup;
  settingsForm: FormGroup;
  isSettingsShown: boolean = false;

  constructor(fb: FormBuilder) {
    this.financeForm = fb.group({
      amount: [0],
    });
    this.initData();
    this.settingsForm = fb.group<FinanceHelperSettingsForm>({
      payDate: fb.control(0, {nonNullable: true}),
      periodAmount: fb.control(0, {nonNullable: true}),
      dailyAmount: fb.control(0, {nonNullable: true}),
      spentToday: fb.control(0, {nonNullable: true}),
      monthBudget: fb.control(0, {nonNullable: true}),
    });
    this.patchForm();
  }

  handleSubmitDaily() {
    if (this.financeForm.valid) {
      this.financeData.addDailySpend(+this.financeForm.value.amount)
      this.patchForm();
      this.saveToLocalStorage();
      this.financeForm.reset({});
    }
  }

  handleSaveSettings() {
    if (this.settingsForm.valid) {
      this.financeData.applySettings(this.settingsForm.value);
      this.patchForm();
      this.saveToLocalStorage();
      this.isSettingsShown = false;
    }
  }

  private initData() {
    let data: Data | null = null;
    const item = localStorage.getItem(LOCAL_STORAGE_KEY)
    try {
      if (item) {
        data = JSON.parse(item);
      }
    } catch (err) {
      // do nothing
    }
    this.financeData = new FinanceData(data || undefined);
  }

  private patchForm() {
    const data = this.financeData.data;
    const period = this.financeData.touchCurrentPeriod();
    const currentDateFinance = this.financeData.touchCurrentDate();
    this.settingsForm.patchValue({
      payDate: data.general.payDate,
      periodAmount: period.periodAmount,
      dailyAmount: period.dailyAmount,
      spentToday: currentDateFinance.amount,
      monthBudget: data.general.monthBudget
    });
  }

  private saveToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.financeData.data));
  }
}
