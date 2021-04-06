import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { NumericTextBoxComponent, SliderTickRenderedEventArgs } from '@syncfusion/ej2-ng-inputs';
import { ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { DataService } from '../data.service';


import { AccumulationChart, AccumulationLegend, PieSeries, AccumulationTooltip,
  AccumulationDataLabel, IAccLoadedEventArgs, AccumulationTheme, IAccPointRenderEventArgs,
} from '@syncfusion/ej2-charts';
import { AccumulationChartComponent } from '@syncfusion/ej2-angular-charts';
AccumulationChart.Inject(AccumulationLegend, PieSeries, AccumulationTooltip, AccumulationDataLabel);


@Component({
  selector: 'app-emisimulator',
  templateUrl: './emisimulator.component.html',
  styleUrls: ['./emisimulator.component.scss']
})
export class EmisimulatorComponent implements OnInit {

  /** Configurations for the Input page */
  constructor(private data: DataService) {
    this.principalValue = this.data.principalValue;
    this.interestValue = this.data.interestValue;
    this.loanValue = this.data.loanValue;
}

// The principal NumericTextBox binding properties
public principalNumMinValue: number = 1000;
public principalNumMaxValue: number = 5000000;
public principalNumStep: number = 10000;
public principalNumFormat: string = 'c0';
public principalNumWidth: string = '200px';

public principalNumChange(args: ChangeEventArgs): void {
    this.data.principalValue = this.principalValue;
    if (args.isInteraction) {
        this.data.refreshUI();
    }
}

// The interest NumericTextBox binding properties
public interestNumMinValue: number = 0;
public interestNumMaxValue: number = 20;
public interestNumStep: number = .25;
public interestNumFormat: string = '#.##\' %\'';
public interestNumWidth: string = '165px';

public interestNumChange(args: ChangeEventArgs): void {
    this.data.interestValue = this.interestValue;
    if (args.isInteraction) {
        this.data.refreshUI();
    }
}

// The loan NumericTextBox binding properties
public loanNumMinValue: number = 1;
public loanNumMaxValue: number = 40;
public loanNumStep: number = 1;
public loanNumFormat: string = '#.##';
public loanNumWidth: string = '150px';

public loanNumChange(args: ChangeEventArgs): void {
    this.data.loanValue = this.loanValue;
    if (args.isInteraction) {
        this.data.refreshUI();
    }
}

// The principal Slider binding properties
public principalValue: number = 0;
public principalMinValue: number = 0;
public principalMaxValue: number = 500000;
public principalStep: number = 10000;
public principalType: string = 'MinRange';
public principalTicks: Object = { placement: 'After', largeStep: 100000, smallStep: 10000, showSmallTicks: false, format: 'c0' };

public principalChange(args: ChangeEventArgs): void {
    this.data.principalValue = this.principalValue;
    this.data.setInitValues();
    this.data.updateTotalAmt();
}

public principalChanged(args: ChangeEventArgs): void {
    this.data.refreshUI();
}

public principalRenderedTicks(args: SliderTickRenderedEventArgs): void {
    // let li:  NodeListOf<Element> = args.ticksWrapper.getElementsByClassName('e-large');
    // for (let i: number = 0; i < li.length; ++i) {
    //     let ele: HTMLElement = (li[i].querySelectorAll('.e-tick-value')[0] as HTMLElement);
    //     let num: number = parseInt(ele.innerText.substring(1).replace(/,/g , ''), 10) / 1000;
    //     ele.innerText = num === 0 ?  ('' + num) : (num + 'K');
    // }
}

// The interest Slider binding properties
public interestValue: number = 0;
public interestMinValue: number = 0;
public interestMaxValue: number = 20;
public interestStep: number = .25;
public interestType: string = 'MinRange';
public interestTicks: Object = { placement: 'After', largeStep: 5, smallStep: 1, showSmallTicks: false };

public interestChange(args: ChangeEventArgs): void {
    this.data.interestValue = this.interestValue;
    this.data.setInitValues();
    this.data.updateTotalAmt();
}

public interestChanged(args: ChangeEventArgs): void {
    this.data.refreshUI();
}

// The loan Slider binding properties
public loanValue: number = 0;
public loanMinValue: number = 0;
public loanMaxValue: number = 40;
public loanStep: number = 1;
public loanType: string = 'MinRange';
public loanTicks: Object = { placement: 'After', largeStep: 10, smallStep: 1, showSmallTicks: false };

public loanChange(args: ChangeEventArgs): void {
    this.data.loanValue = this.loanValue;
    this.data.setInitValues();
    this.data.updateTotalAmt();
}

public loanChanged(args: ChangeEventArgs): void {
    this.data.refreshUI();
}

// Radio button binding properties
public yearTenure: boolean = this.data.yearTenure;

public monthChanged(): void {
    this.data.yearTenure = this.yearTenure = false;
    this.loanNumMinValue = 12;
    this.loanNumMaxValue = 480;
    this.loanNumStep = 12;
    this.loanMaxValue = 480;
    this.loanValue = (this.loanValue * 12);
    this.loanStep = 12;
    this.loanTicks = { placement: 'After', largeStep: 120, smallStep: 12, showSmallTicks: false };
}

public yearChanged(): void {
    this.data.yearTenure = this.yearTenure = true;
    this.loanNumMinValue = 1;
    this.loanNumMaxValue = 40;
    this.loanNumStep = 1;
    this.loanMaxValue = 40;
    this.loanValue = (this.loanValue / 12);
    this.loanStep = 1;
    this.loanTicks = { largeStep: 10, smallStep: 1, showSmallTicks: false };
}

public ngOnInit(): void {
}

public ngAfterViewInit(): void {
}



/** Dashboard */

@ViewChild('pieChart')
    public pieChart: AccumulationChartComponent;

    // chart binding properties
    public legendSettings: Object = { visible: false };
    public width: string = '100%';
    public tooltip: Object = { enable: false };
    public pieSeries: Object[] = [
        {
            dataSource: [
                { 'x': 'Principal Amount', y: this.data.principalValue },
                { 'x': 'Interest Amount', y: ((this.data.emi * this.data.tent) - this.data.principalValue) }
            ],
            radius: '80%', xName: 'x',
            animation: { enable: true },
            yName: 'y',
            startAngle: 290,
            endAngle: 290, innerRadius: '60%',
            explode: true, explodeOffset: '10%', explodeIndex: 3
        }
    ];
    public emiAmt: string = this.data.emiAmt;
    public principalAmt: string = this.data.principalAmt;
    public interestAmt: string = this.data.interestAmt;
    public totalAmt: string = this.data.totalAmt;

    public onLoad(args: IAccLoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.accumulation.theme = <AccumulationTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
    }

    public pointRender(args: IAccPointRenderEventArgs): void {
        if (args.point.index) {
            args.border.width = 7;
            args.fill = 'url(#interest_svg)';
        } else {
            args.border.width = 7;
            args.border.color = '#162036';
            args.fill = 'url(#principal_svg)';
        }
    }

}
