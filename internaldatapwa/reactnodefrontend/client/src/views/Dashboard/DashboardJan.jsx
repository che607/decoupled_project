import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
import CountUp from 'react-countup';

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";



import {
    dataPie,
    legendPie,
    optionsPie,
    arDataBar,
    arOptionsBar,
    arResponsiveBar,
    arLegendBar,
    ieDataBar,
    ieOptionsBar,
    ieResponsiveBar,
    ieLegendBar,
    caDataBar,
    caOptionsBar,
    caResponsiveBar,
} from "variables/Variables.jsx";


class Dashboard extends Component {


    createLegend(json) {
        var legend = [];
        for (var i = 0; i < json["names"].length; i++) {
            var type = "fa fa-circle text-" + json["types"][i];
            legend.push(<i className={type} key={i} />);
            legend.push(" ");
            legend.push(json["names"][i]);
        }
        return legend;
    }

    state = {
        response: '',
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await fetch('http://d8decoupled.test/jsonapi/node/accounting_month/3270b759-2e6d-4dc9-87ac-9d2041e9dbf7');
        const body = await response.json();

        // Set date -------------------->
        let date = body.data.attributes.title;

        // Set Accounts Receivable Week 1 30 Days/60 Days/90 Days-------------------->
        arDataBar.series[0][0] = body.data.attributes.field_account_receivable_week_1_;
        arDataBar.series[1][0] = body.data.attributes.field_account_receivable_wk_1_60;
        arDataBar.series[2][0] = body.data.attributes.field_account_receivable_wk_1_90;

        // Set Accounts Receivable Week 2 30 Days/60 Days/90 Days-------------------->
        arDataBar.series[0][1] = body.data.attributes.field_account_receivable_week_2_;
        arDataBar.series[1][1] = body.data.attributes.field_account_receivable_wk_2_60;
        arDataBar.series[2][1] = body.data.attributes.field_account_receivable_wk_2_90;

        // Set Accounts Receivable Week 3 30 Days/60 Days/90 Days-------------------->
        arDataBar.series[0][2] = body.data.attributes.field_account_receivable_week_3_;
        arDataBar.series[1][2] = body.data.attributes.field_account_receivable_wk_3_60;
        arDataBar.series[2][2] = body.data.attributes.field_account_receivable_wk_3_90;

        // Set Accounts Receivable Week 4 30 Days/60 Days/90 Days-------------------->
        arDataBar.series[0][3] = body.data.attributes.field_account_receivable_week_4_;
        arDataBar.series[1][3] = body.data.attributes.field_account_receivable_wk_4_60;
        arDataBar.series[2][3] = body.data.attributes.field_account_receivable_wk_4_90;

        // Set Cash Added to Bank This Month -------------------->
        caDataBar.series[0][0].value = body.data.attributes.field_cash_added_to_bank_this_mo;

        // Set Expected Monthly Income ------------------->
        let mei = <CountUp start={0} end={body.data.attributes.field_expected_monthly_income} separator="," duration={1} decimals={2} prefix={"$"} redraw={true}/>;
        // Set Monthly Income to Date -------------------->
        let mitd = <CountUp start={0} end={body.data.attributes.field_monthly_income_to_date} separator="," duration={1} decimals={2} prefix={"$"} redraw={true}/>;

        // Set Monthly Profit on Accrual -------------------->
        let mpoa = <CountUp start={0} end={body.data.attributes.field_monthly_profit_on_accrual} separator="," duration={1} decimals={2} prefix={"$"} redraw={true}/>;

        // Set Monthly Profit on Cash -------------------->
        let mpoc = <CountUp start={0} end={body.data.attributes.field_monthly_profit_on_cash} separator="," duration={1} decimals={2} prefix={"$"} redraw={true}/>;

        let financialInfo = [
            date,
            mei,
            mitd,
            mpoa,
            mpoc
        ];

        // Progress Towards Monthly Goal-------------------->
        // Income Dollar Amount
        if (body.data.attributes.field_progress_towards_monthly_g.length === 9){
            dataPie.labels[1] = "$" + body.data.attributes.field_progress_towards_monthly_g.substring(0,3) + ',' + body.data.attributes.field_progress_towards_monthly_g.substring(3);
        } else {
            dataPie.labels[1] = "$" + body.data.attributes.field_progress_towards_monthly_g.substring(0,2) + ',' + body.data.attributes.field_progress_towards_monthly_g.substring(2);
        };
        // Income Chart Representation Percentage
        dataPie.series[1].value = body.data.attributes.field_progress_towards_monthly_g;
        // Expenses Dollar Amount
        if (body.data.attributes.field_progress_towards_monthly_e.length === 9){
            dataPie.labels[0] = "$" + body.data.attributes.field_progress_towards_monthly_e.substring(0,3) + ',' + body.data.attributes.field_progress_towards_monthly_e.substring(3);
        } else {
            dataPie.labels[0] = "$" + body.data.attributes.field_progress_towards_monthly_e.substring(0,2) + ',' + body.data.attributes.field_progress_towards_monthly_e.substring(2);
        };
        // Expenses Chart Representation Percentage
        dataPie.series[0].value = body.data.attributes.field_progress_towards_monthly_e;
        // Monthly Goal
        let mG = <CountUp start={0} end={body.data.attributes.field_monthly_goal} separator="," duration={2} decimals={2} prefix={"$"} redraw={true}/>
        console.log(mG);
        legendPie.names[0] = "MONTHLY GOAL - $" + mG.props.end + " ";

        // Income vs Expenses -------------------->
        // Week 1
        ieDataBar.series[0][0].value = body.data.attributes.field_income_vs_expenses_wk_1_i;
        ieDataBar.series[1][0].value = body.data.attributes.field_income_vs_expenses_wk_22_e;
        // Week 2
        ieDataBar.series[0][1].value = body.data.attributes.field_income_vs_expenses_week_2_;
        ieDataBar.series[1][1].value = body.data.attributes.field_income_vs_expenses_wk_2_e;

        // Week 3
        ieDataBar.series[0][2].value = body.data.attributes.field_income_vs_expenses_wk_3_i;
        ieDataBar.series[1][2].value = body.data.attributes.field_income_vs_expenses_wk_3_e;

        // Week 4
        ieDataBar.series[0][3].value = body.data.attributes.field_income_vs_expenses_wk_4_i;
        ieDataBar.series[1][3].value = body.data.attributes.field_income_vs_expenses_week_4_;

        if (response.status !== 200) throw Error(body.message);

        return financialInfo;
    };




    render() {
        return (
            <div className="content">
                <h4 className="dateHeader">{this.state.response[0]}</h4>
                <Grid fluid>
                    <Row>
                        <Col md={8}>
                            <Card
                                statsIcon="fa fa-history"
                                id="chartHours"
                                title="Accounts Receivable"
                                category=""
                                stats="Updated 3 minutes ago"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph className="ar"
                                                       data={arDataBar}
                                                       type="Bar"
                                                       options={arOptionsBar}
                                                       responsiveOptions={arResponsiveBar}
                                        />
                                    </div>
                                }
                                legend={
                                    <div className="legend">{this.createLegend(arLegendBar)}</div>
                                }
                            />
                        </Col>
                        <Col md={4}>
                            <Card
                                statsIcon="fa fa-clock-o"
                                title="Cash Added to Bank This Month"
                                category=""
                                stats="Campaign sent 2 days ago"
                                content={
                                    <div
                                        id="chartPreferences"
                                        className="ct-chart ca ct-perfect-fourth"
                                    >
                                        <ChartistGraph className="ar ca"
                                                       data={caDataBar}
                                                       type="Bar"
                                                       options={caOptionsBar}
                                                       responsiveOptions={caResponsiveBar}
                                        />
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-server text-success" />}
                                statsText="Expected Monthly Income"
                                statsValue={this.state.response[1]}
                                // statsIcon={<i className="fa fa-refresh" />}
                                // statsIconText="Updated now"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-wallet text-success" />}
                                statsText="Monthly Income to Date"
                                statsValue={this.state.response[2]}
                                // statsIcon={<i className="fa fa-calendar-o" />}
                                // statsIconText="Last day"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                                statsText="Monthly Profit on Accrual"
                                statsValue={this.state.response[3]}
                                // statsIcon={<i className="fa fa-clock-o" />}
                                // statsIconText="In the last hour"
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                                statsText="Monthly Profit on Cash"
                                statsValue={this.state.response[4]}
                                // statsIcon={<i className="fa fa-refresh" />}
                                // statsIconText="Updated now"
                            />
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Card
                                id="chartActivity"
                                title="Progress Towards Monthly Goal"
                                category="*This number is based on current cash received not on accrual"
                                stats="Data information certified"
                                statsIcon="fa fa-check"
                                content={
                                    <div className="ct-chart ptmg">
                                        <ChartistGraph
                                            data={dataPie}
                                            type="Pie"
                                            options={optionsPie}
                                            // responsiveOptions={responsiveBar}
                                        />
                                    </div>
                                }
                                legend={
                                    <div className="legend">{this.createLegend(legendPie)}</div>
                                }
                            />
                        </Col>

                        <Col md={6}>
                            <Card
                                title="Income vs Expenses"
                                category="Updated Monthly"
                                stats="Updated 3 minutes ago"
                                statsIcon="fa fa-history"
                                content={
                                    <div
                                        id="chartPreferences"
                                        className="ct-chart ct-perfect-fourth ie"
                                    >
                                        <ChartistGraph
                                            data={ieDataBar}
                                            type="Bar"
                                            options={ieOptionsBar}
                                            responsiveOptions={ieResponsiveBar}
                                            // listener={{"draw" : function(data) { if(data.type === 'bar') {
                                            //         data.element.animate({
                                            //             y2: {
                                            //                 begin: 0,
                                            //                 dur: 500,
                                            //                 from: data.y1,
                                            //                 to: data.y2,
                                            //                 easing: Chartist.Svg.Easing.easeOutSine,
                                            //             }})
                                            //     }}}
                                        />
                                    </div>
                                }
                                legend={
                                    <div className="legend">{this.createLegend(ieLegendBar)}</div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Dashboard;
