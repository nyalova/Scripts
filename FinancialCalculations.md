# Introduction

**These scripts are about the personal finance and written for who have no idea about the money management.**

**Each of them aims improve people financial knowledge.**

*Common Libraries*

`import pandas as pd`

`import seaborn as sns`

`from matplotlib import pyplot as plt`

## Stock Investment Function

Stock Investment function provide parameters to calculate expected return 

 Price : Stock Price
 
 Amount : Stock Price * Number of shares
 
 Diveff : Dividend efficiency
 
 pg : Price Growth
 
 pe : price to earning ratio
 
 years : number of years for iteration
 

	
~~~~
def stockinvestment (price,amount,diveff,pg,pe,years) : 
 stocks = amount/price
    price = price
    lprice,lstocks,lamount,ldiveff,lpg,ldiv,lyears,lstockprice , lcost = ([] for i in range(9))
    for i in range(1,years+1) :
        lprice.append(price)
        lstocks.append(stocks)
        lamount.append(amount)
        ldiveff.append(diveff)
        lpg.append(pg)
        eps = price / pe
        div = eps * diveff
        ldiv.append(div)
        lyears.append(i)
        cost =  lprice[0] - div
        lcost.append(cost)
        price = price *pg
        stocks = stocks + (div/price)
        amount = stocks*price


        if i == years :
            data = {"Prices": lprice , "Stocks": lstocks , "Amount": lamount , "Dividend": ldiv , "PriceGrowth": lpg , "Years": lyears , }
            data = pd.DataFrame(data)
    return sns.barplot(x=lyears,y=lamount) , plt.xlim(0,20) , plt.ylim(0,max(lamount)*1.1) , \
        plt.xlabel("Years") , \
        plt.ylabel("Total Amount") , \
        plt.show() , \
        sns.barplot(x=lyears, y=lcost), \
        plt.xlabel("Years") ,\
        plt.ylabel("Stock Cost") ,\
        plt.xlim(0,max(lyears)) ,\
        plt.ylim(0,lprice[0]) ,\
        plt.show() ,\
        print("Profit from dividends :" + str("{:,}".format(int(ldiv[-1])) )) , \
        print("Profit from price growth :" + str("{:,}".format(int(lprice[-1])))) ,\
        print("Net profit is: " + str("{:,}".format(int(lamount[-1] - lamount[0])))) ,\
        print("Net Capital Growth : " + str("{:,}".format(((int(lamount[-1]-lamount[0])/lamount[0]))) )) ,\
        print(data) ,\
        	
~~~~


## Systematic Saving

Systematic Saving function calculates your total saving with Starting Amount, additional contributions and interest from your base savings and additional contributions.

Starting Amount : Base savings

AfterbyMonth : Number of months for savings

ReturnRatebyMonth: Return Rate for a month (ex. 1.04)

AdditionalContribution :

~~~~

lstart,ladditional, lmonth, lreturnrate = ([] for i in range(4))

def SystematicSaving(StartingAmount,AfterbyMonth,ReturnRatebyMonth,AdditionalContribution) :
    labels = ["Starting Amount", "Interests", "Additional Contributions"]
    for i in range(1, AfterbyMonth+1) :
        returnrate = StartingAmount * ReturnRatebyMonth
        lreturnrate.append(returnrate)
        ladditional.append(AdditionalContribution)
        lstart.append(StartingAmount)
        lmonth.append(i)
        StartingAmount = (returnrate) + AdditionalContribution
        if i == AfterbyMonth :
            data = {"Months": lmonth,"Amount": lstart,"Return": lreturnrate }
            data = pd.DataFrame(data)
            size =[lstart[0]/lstart[-1],(lstart[-1]-ladditional[-1]-lstart[0])/lstart[-1],(AdditionalContribution*ReturnRatebyMonth)/lstart[-1]]
            # colors
            colors = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99']
            # explsion
            explode = (0.05, 0.05, 0.05, 0.05)
            def piechart () :
                plt.pie(size, colors=colors, labels=labels, autopct='%1.1f%%', startangle=90, pctdistance=0.85)
                plt.axis("equal")
                plt.show()

    return sns.barplot(x=lmonth , y= lstart) , \
           plt.xlabel("Years"), \
           plt.ylabel("Total Amount"), \
           plt.show(), \
           piechart(), \
           print("Your starting amount is " + str(StartingAmount) + "and your total savings in " + str(AfterbyMonth) + " is " + str(AdditionalContribution)) ,\
           print(data)

~~~~

## Latte Factor 

Latte Factor function calculates that return of regular but unnecesary spendings. 

Expenditure:  Unnecessary spending

Frequency: Spending frequency

Exp_ret: Expected return rate

Life_Expectancy: Number of years for cutting spending and investing them

~~~~
def Latte(Expenditure,Frequency,Exp_ret,Life_Expectancy) :
    lexpenditure, linterest, lcost, lyears, size, colors = ([] for i in range(6))
    labels = ["Expenditures","Interests"]
    earnings = 0
    for i in range(1,Life_Expectancy) :
        lyears.append(i)
        years_expenditure = Expenditure*Frequency*52*i
        lexpenditure.append(years_expenditure)
        cost = (Expenditure*Exp_ret)*(1+Exp_ret)**i-1
        lcost.append(cost)
        linterest.append(lcost[i-1] - lexpenditure[i-1])
        if i == Life_Expectancy :
            data = {"Years": lyears,"Expenditure": lexpenditure,"Interests": linterest , "Oppourtunity Cost " : lcost }
            data = pd.DataFrame(data)
    return sns.barplot(x=lyears , y= lcost) , \
    plt.xlabel("Years"), \
    plt.ylabel("Oppourtunity Cost"), \
    plt.ticklabel_format(axis = "y" , style ="plain") ,\
    plt.show(), \
    print("You have spent " + str("{:,}".format(int(lexpenditure[-1])) + " in " + str(Life_Expectancy) + " years")) ,\
    print("If you invest these expenditures, you would have " + str("{:,}".format(int(lcost[-1])) + " in " + str(Life_Expectancy) + " years")) ,\
    print("And you would have " + str("{:,}".format(int(linterest[-1]))) + " from interests") ,\
~~~~


