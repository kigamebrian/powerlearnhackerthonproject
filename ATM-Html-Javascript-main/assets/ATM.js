class ATM
{
	constructor()
	{
		this.acceptedBills 				=	[500,100,50,10,5,1];	//MUST BE IN DECREASING ORDER
		this.availableBills 			= {};
		this.extractedBills 			= {};
		this.availableAmount 			= 0;
		this.extractedAmount 			= 0;
		this.onlyAcceptedMessage 	= 'Only accepted bills of ' + this.acceptedBills.toString();
		this.drawATMConsole();
		this.interface;

		this.tempBillsToExtract;
		this.tempTotalAmountToExtract;

		for(var i in this.acceptedBills){ 
			this.availableBills[this.acceptedBills[i]] = 0;
			this.extractedBills[this.acceptedBills[i]] = 0;
		}

		this.addMoney(500,5);
		this.addMoney(100,20);
		this.addMoney(50,20);
		this.addMoney(10,20);
		this.addMoney(5,50);
		this.addMoney(1,50);
		
		this.showAvailableMoney();
		
		//this.extractMoney(1000);
		//this.extractMoney(2999)
		//this.extractMoney(239)
	}

	drawATMConsole(){
		for(var i of this.acceptedBills)
		{
			document.getElementById('atmConsoleContainer').innerHTML += ' \
				<tr>\
					<td width="40" align="center"><span class="moneyBadge">$'+i+'</span></td>\
					<td class="dots" id="atmDotsFor'+i+'"></td>\
				</tr>';

			document.getElementById('extractedConsoleContainer').innerHTML += ' \
				<tr>\
					<td width="40" align="center"><span class="moneyBadge">$'+i+'</span></td>\
					<td class="dots" id="extractedDotsFor'+i+'"></td>\
				</tr>';
		}
	}

	refreshATMConsole()
	{
		for(var billValue of this.acceptedBills) 
		{
			//SHOW DOTS IN ATM MONEY
			var animate = false;
			var dots = '';
			if(animate == false)
			{
				for(var i=0; i<this.availableBills[billValue]; i++) dots += "● ";
			}
			else
			{
				for(var i=0; i<this.availableBills[billValue]; i++)
				{
					dots += "<span id='d"+billValue+"_"+i+"' class='hide'>● </span>";
					setTimeout((billValue,i)=>{
						console.log(i);
						document.getElementById("d"+billValue+"_"+i).classList.remove('hide');
					 }, 15*i,billValue,i);
				} 	
			}
			
			
			document.getElementById('atmDotsFor'+billValue).innerHTML = dots;
			document.getElementById('balanceBadge').innerHTML = this.availableAmount;

			//FOR EXTRACTED MONEY
			dots = '';
			for(i=0; i<this.extractedBills[billValue]; i++) dots += "● ";
			document.getElementById('extractedDotsFor'+billValue).innerHTML = dots;
			document.getElementById('extractedBadge').innerHTML = this.extractedAmount;
		}


	}

	addMoney(billValue,quantity)
	{
		var accepted = this.acceptedBills.includes(billValue);

		if(accepted) //IF BILL IS ACCEPTED
		{
			this.availableBills[billValue] += quantity;
			this.availableAmount += (billValue * quantity);

			this.refreshATMConsole();
			//console.log('Money added');
			return true;
		}
		else //IF BILL IS NOT ACCEPTED
		{
			
			console.log('"' + billValue + '" bills are not accepted. ' + this.onlyAcceptedMessage);
			return false;	
		}		
	}

	showAvailableMoney()
	{
		console.log('Available Amount: '+ this.availableAmount,this.availableBills);
	}

	extractMoney(amountRequired)
	{
		if(amountRequired==0) return;
		console.log('============');
		console.log('Request: Extract ' + amountRequired + ' USD');

		var pendingToExtract = amountRequired;
		var totalAmountToExtract = 0;
		var billsToExtract = {}

		for(var billValue of this.acceptedBills)
		{
			var billsAvailable = this.availableBills[billValue];
			var billsNeeded = Math.floor(pendingToExtract/billValue);
			var billsExtracted;
			if(billsNeeded > billsAvailable)
			{
				billsExtracted = billsAvailable;
			}
			else
			{
				billsExtracted = billsNeeded;
			}

			billsToExtract[billValue] = billsExtracted;

			var amountExtractedInThisIteration = (billValue * billsExtracted);
			totalAmountToExtract += amountExtractedInThisIteration;
			pendingToExtract -= amountExtractedInThisIteration;
			console.log(billsExtracted + ' bills of ' + billValue + ' USD to be extracted. Completed: ' + totalAmountToExtract + ' USD. Pending: ' + pendingToExtract + ' USD');
			if(pendingToExtract<=0) break;
		}

		if(amountRequired == totalAmountToExtract)
		{
			this._doExtractMoney(billsToExtract, totalAmountToExtract);		//DO EXTRACT
		}
		else
		{
			if(totalAmountToExtract > 0)
			{
				console.log('Result: Not enough Money on the ATM. We only have ' + totalAmountToExtract + ' USD. Do you want to Withdraw?');
				document.getElementById('confirmOnlyAvailable').innerHTML = totalAmountToExtract;
				this.interface.changeScreen(this.interface.screens.confirm);
				this.tempBillsToExtract = billsToExtract;
				this.tempTotalAmountToExtract = totalAmountToExtract;
				//this._doExtractMoney(billsToExtract, totalAmountToExtract);
			}
			else
			{
				this.interface.changeScreen(this.interface.screens.nomoney);
				console.log('zzz Result: Not enough Money on the ATM');
			}
		}

		//console.log('Available money',this.availableBills);
	}

	_doExtractMoney(billsToExtract,amountToExtract)
	{
		console.log('doExtract',billsToExtract);

		this.availableAmount -= amountToExtract;
		this.extractedAmount += amountToExtract;
		for(var billValue in billsToExtract)
		{
			var numOfBills = billsToExtract[billValue];

			this.availableBills[billValue] -= numOfBills;
			this.extractedBills[billValue] += numOfBills;
		}

		this.refreshATMConsole();
		document.getElementById('extracted').innerHTML = amountToExtract;
		this.interface.changeScreen(this.interface.screens.result);
		console.log('Result: ' + amountToExtract + ' USD extracted successfully!');
	}
}