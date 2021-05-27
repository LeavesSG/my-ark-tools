class Carnelian{
    //干员 卡涅利安
    constructor(){

    }
    updateProps(props){
        this.atk = props.atk;
        this.atk_interval = props.atk_interval;
        this.atk_boost = props.atk_boost;
        this.skill_duration = props.skill_duration;
        this.dmg_buff = props.dmg_buff;
        this.max_buff_stack = props.max_buff_stack;
    }
}

function dpsCalculate(operator){
    var tick = 0;   //起始刻为0
    var atk_dmg;    //每次攻击的伤害
    var buff_stack = 0; //增伤印记层数
    var dmg_dealt = 0   //技能期共造成的伤害
    var atk_count = 0
    atk = operator.atk; //导入初始攻击

    while(tick<=operator.skill_duration*60){

        if (tick%(operator.atk_interval*60)==0){    //当前游戏刻将要攻击时
            atk_count+=1;
            atk_dmg = atk * (1+buff_stack*operator.dmg_buff)    //实际攻击伤害
            dmg_dealt += atk_dmg
            if (buff_stack<operator.max_buff_stack){    //当增伤印记未到最大层数时
                buff_stack+=1;  //叠加一层印记
            }

        }

        if(tick%60==0){     //每秒增加攻击力
            atk += operator.atk*operator.atk_boost;
        }

        //游戏刻+1
        tick+=1;
    }

    return {total_dmg: dmg_dealt, 
            dps: operator.skill_duration==0 ? 0 : dmg_dealt/operator.skill_duration,
            atk_count: atk_count}

}

function initCalculator(){    //网页加载后运行

    //从网页内导入干员数据
    props = {
        atk: parseFloat(document.getElementById("input_atk").value),
        atk_interval: parseFloat(document.getElementById("input_atk_interval").value),
        atk_boost: parseFloat(document.getElementById("input_atk_boost").value),
        skill_duration: parseFloat(document.getElementById("input_skill_duration").value),
        dmg_buff: parseFloat(document.getElementById("input_dmg_buff").value),
        max_buff_stack : parseFloat(document.getElementById("input_max_buff_stack").value)
    }
    
    carnelian = new Carnelian()
    carnelian.updateProps(props)
    dps_result = dpsCalculate(carnelian)

    //填充结果
    document.getElementById("result_total_dmg").innerHTML = "技能期总伤为： "+parseInt(dps_result.total_dmg);
    document.getElementById("result_dps").innerHTML = "技能期DPS为： "+parseInt(dps_result.dps);
    document.getElementById("result_atk_count").innerHTML = "技能期间攻击次数： "+parseInt(dps_result.atk_count);


}

function updateResult(){    //每次拖动进度条后重新计算

    props = {
        atk: parseFloat(document.getElementById("input_atk").value),
        atk_interval: parseFloat(document.getElementById("input_atk_interval").value),
        atk_boost: parseFloat(document.getElementById("input_atk_boost").value),
        skill_duration: parseFloat(document.getElementById("input_skill_duration").value),
        dmg_buff: parseFloat(document.getElementById("input_dmg_buff").value),
        max_buff_stack : parseFloat(document.getElementById("input_max_buff_stack").value)
    }

    console.log(props)
    carnelian.updateProps(props)
    dps_result = dpsCalculate(carnelian)
    document.getElementById("result_total_dmg").innerHTML = "技能期总伤为： "+parseInt(dps_result.total_dmg);
    document.getElementById("result_dps").innerHTML = "技能期DPS为： "+parseInt(dps_result.dps);
    document.getElementById("result_atk_count").innerHTML = "技能期间攻击次数： "+parseInt(dps_result.atk_count);


}

initCalculator();