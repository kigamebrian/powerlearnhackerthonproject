class Interface
{
	constructor()
	{
		this.screens = {
			home 			: 'screen_home',
			confirm 	: 'screen_confirm',
			result 		:	'screen_result',
			nomoney 	:	'screen_nomoney',
		}
		
		this.addListeners();
		this.atm;
		this.amount = 0;

		this.changeScreen(this.screens.home);
	}

	addListeners()
	{
		document.getElementById('btn0').addEventListener('click',e=>this.onKeyDown('0'))
		document.getElementById('btn1').addEventListener('click',e=>this.onKeyDown('1'))
		document.getElementById('btn2').addEventListener('click',e=>this.onKeyDown('2'))
		document.getElementById('btn3').addEventListener('click',e=>this.onKeyDown('3'))
		document.getElementById('btn4').addEventListener('click',e=>this.onKeyDown('4'))
		document.getElementById('btn5').addEventListener('click',e=>this.onKeyDown('5'))
		document.getElementById('btn6').addEventListener('click',e=>this.onKeyDown('6'))
		document.getElementById('btn7').addEventListener('click',e=>this.onKeyDown('7'))
		document.getElementById('btn8').addEventListener('click',e=>this.onKeyDown('8'))
		document.getElementById('btn9').addEventListener('click',e=>this.onKeyDown('9'))

		document.getElementById('btnAccept').addEventListener('click', e=> this.onKeyDown('Enter'))
		document.getElementById('btnCancel').addEventListener('click', e=> this.onKeyDown('Escape'))
		
		window.addEventListener('keydown',e=>this.onKeyDown(e.key))

		document.getElementById('reload').addEventListener('click',function(){ location.reload() })
	}

	onKeyDown(key)
	{
		var numbers = ['0','1','2','3','4','5','6','7','8','9'];
		console.log('key',key);

		if(this.currentScreen == this.screens.home)
		{
			if(numbers.includes(key)) 	this.typeAmount(key);
			if(key == "Enter")					this.btnAcceptClicked();
			if(key == "Escape") 				this.clearAmount();
			if(key == "Backspace") 			this.backSpace();
			if(key == "Delete") 				this.backSpace();
			return;
		}
		if(this.currentScreen == this.screens.confirm)
		{
			if(key == "Escape")
			{
				this.clearAmount();
				this.changeScreen(this.screens.home);
				return;
			}
			if(key == "Enter")
			{

				this.atm._doExtractMoney(this.atm.tempBillsToExtract,this.atm.tempTotalAmountToExtract)
				//this._doExtractMoney(billsToExtract, totalAmountToExtract);
				return;
			}
			return;
		}
		if(this.currentScreen == this.screens.result || this.currentScreen == this.screens.nomoney)
		{
			if(key == "Enter" || key == "Escape"){
				this.clearAmount();
				this.changeScreen(this.screens.home);
				return;
			}
			return;
		}
	}

	btnAcceptClicked()
	{
		this.atm.extractMoney(this.amount);
		this.clearAmount();
	}

	btnCancelClicked()
	{
		this.clearAmount();
	}

	clearAmount()
	{
		this.amount = 0;
		this.refreshInput();
	}

	typeAmount(number)
	{
		this.amount = Number(this.amount + number);
		this.refreshInput();
	}

	backSpace()
	{
		var amountString = String(this.amount);
		this.amount = Number(amountString.substring(0,amountString.length-1));
		this.refreshInput();
	}

	refreshInput()
	{
		document.getElementById('input').innerHTML = this.amount;
	}

	changeScreen(screenName)
	{
		console.log('changin screen :',screenName)
		this.currentScreen = screenName;
		for(var screen of document.getElementsByClassName('screen_container')){
			screen.classList.add('hide');
		}
		document.getElementById(this.currentScreen).classList.remove('hide');
		
	}
}