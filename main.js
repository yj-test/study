function creatDate(){
    for(var i = 2008; i<=2018;i++){
        var option = document.createElement('option');
        option.setAttribute('value',i);
        option.innerHTML = i;
        sel1.appendChild(option);
    }
    //生成1月-12月
    for(var i = 1; i <=12; i++){
        var option = document.createElement('option');
        option.setAttribute('value',i);
        option.innerHTML = i;
        sel2.appendChild(option);
    }
    //生成1日—31日
    for(var i = 1; i <=31; i++){
        var option = document.createElement('option');
        option.setAttribute('value',i);
        option.innerHTML = i;
        sel3.appendChild(option);
    }
}
creatDate();
//保存某年某月的天数
var days;
//年份点击
sel1.onclick = function(){
    //月份显示默认值
    sel2.options[0].selected = true;
    //天数显示默认值
    sel3.options[0].selected = true;
}
//月份点击
sel2.onclick = function(){
    //天数显示默认值
    sel3.options[0].selected = true;
    //计算天数的显示范围
    //如果是2月
    if(sel2.value == 2){
        //如果是闰年
        if((sel1.value % 4 === 0 && sel1.value % 100 !== 0)  || sel1.value % 400 === 0){
            days = 29;
            //如果是平年
        }else{
            days = 28;
        }
        //如果是第4、6、9、11月
    }else if(sel2.value == 4 || sel2.value == 6 ||sel2.value == 9 ||sel2.value == 11){
        days = 30;
    }else{
        days = 31;
    }
    //增加或删除天数
    //如果是28天，则删除29、30、31天(即使他们不存在也不报错)
    if(days == 28){
        sel3.remove(31);
        sel3.remove(30);
        sel3.remove(29);
    }
    //如果是29天
    if(days == 29){
        sel3.remove(31);
        sel3.remove(30);
        //如果第29天不存在，则添加第29天
        if(!sel3.options[29]){
            sel3.add(new Option('29','29'),undefined)
        }
    }
    //如果是30天
    if(days == 30){
        sel3.remove(31);
        //如果第29天不存在，则添加第29天
        if(!sel3.options[29]){
            sel3.add(new Option('29','29'),undefined)
        }
        //如果第30天不存在，则添加第30天
        if(!sel3.options[30]){
            sel3.add(new Option('30','30'),undefined)
        }
    }
    //如果是31天
    if(days == 31){
        //如果第29天不存在，则添加第29天
        if(!sel3.options[29]){
            sel3.add(new Option('29','29'),undefined)
        }
        //如果第30天不存在，则添加第30天
        if(!sel3.options[30]){
            sel3.add(new Option('30','30'),undefined)
        }
        //如果第31天不存在，则添加第31天
        if(!sel3.options[31]){
            sel3.add(new Option('31','31'),undefined)
        }
    }
}
function setdisabled(){
	$('.disable').attr("disabled",true);
}
setdisabled();
function setEnabled(){	
	$('.disable').attr("disabled",false);
}
check.onclick = function(){
	if(check.checked){
		setEnabled();
	}else{
		setdisabled();
	}
}	
questionResult = 0;

function refreshQuestion(){
	var val1 = Math.floor(Math.random()*10); 
	Math.random();
	var val2 = Math.floor(Math.random()*10); 
	$("#question").html(val1 + '+' + val2 + '=');
	questionResult = val1 + val2;	
	$('#refreshResult').attr("disabled",false);
}	
refresh.onclick = refreshQuestion;

$("#name").blur(function(){
	var $name=$("#name").val();	
	if($name==''){
		return;
	}
	var han = /^[\u4e00-\u9fa5]+$/;
	if(($name.length<2) || ($name.length>16) || !han.test($name)){
		alert("用户名为2-16位汉字");
		$("#name").val('');
	}	
});	

$("#password").blur(function(){
	var $password=$("#password").val();	
	if($password==''){
		return;
	}
	var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){7,11}$/;
	var patrn2=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{7,11}$/
	if(!patrn.test($password) || !patrn2.test($password)){
		alert("密码不符合规范");
		$("#password").val('');
	}	
});

$("#passwordagin").blur(function(){
	var $password=$("#password").val();	
	var $passwordagin=$("#passwordagin").val();
	if($passwordagin==''){
		return;
	}
	if($passwordagin!=$password){
		alert("密码不一致");
		$("#passwordagin").val('');
	}	
});

$("#email").blur(function(){
	var $email=$("#email").val();	
	if($email==''){
		return;
	}
	var pattern = /^([A-Za-z]{1,}[A-Za-z0-9_\-\.]*)+\@([A-Za-z0-9_\-\.]*)+\.([A-Za-z]{1,})$/;
	if(!pattern.test($email) || ($email.length<6) || ($email.length>10)){
		alert("邮箱不正确");
		$("#email").val('');
	}	
});



$("#refreshResult").keypress(function(e){
	    var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
        if (eCode == 13){
			var $refreshResult = $("#refreshResult").val();
			if($refreshResult == questionResult){
				$("#returnResult").html('✔');
			}else{
				$("#returnResult").html('X');
				$('#refreshResult').attr("disabled",true);
			}
        }
})



	

