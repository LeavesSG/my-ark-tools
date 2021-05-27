class Carnelian{
    constructor(props){
        this.atk = props.atk;
        this.atk_interval = props.atk_interval;
        this.atk_boost = props.atk_boost;
        this.skill_duration = props.skill_duration;
        this.dmg_buff = props.dmg_buff;
        this.max_buff_stack = props.max_buff_stack;
    }
}

function dpsCalculate(operator){
    var time = 0;
    var atk_dmg;
    var buff_stack = 0;
    var dmg_dealt = 0
    atk = operator.atk;
    while(time<=operator.skill_duration*60){
        if (time%(operator.atk_interval*60)==0){
            atk_dmg = atk * (1+buff_stack*operator.dmg_buff)
            dmg_dealt += atk_dmg
            if (buff_stack<operator.max_buff_stack){
                buff_stack+=1;
            }
            console.log("attck!", atk)
            console.log(dmg_dealt)
        }
        if(time%60==0){
            atk += operator.atk*operator.atk_boost;
        }
        time+=1;
    }

    return {total_dmg: dmg_dealt, dps: dmg_dealt/operator.skill_duration}

}



function updateResult(){

    props = {
        atk: parseFloat(document.getElementById("input_atk").value),
        atk_interval: parseFloat(document.getElementById("input_atk_interval").value),
        atk_boost: parseFloat(document.getElementById("input_atk_boost").value),
        skill_duration: parseFloat(document.getElementById("input_skill_duration").value),
        dmg_buff: parseFloat(document.getElementById("input_dmg_buff").value),
        max_buff_stack : parseFloat(document.getElementById("input_max_buff_stack").value)
    }

    console.log(props)
    carnelian = new Carnelian(props)
    dps_result = dpsCalculate(carnelian)
    document.getElementById("result_total_dmg").innerHTML = "技能期总伤为： "+parseInt(dps_result.total_dmg);
    document.getElementById("result_dps").innerHTML = "技能期DPS为： "+parseInt(dps_result.dps);


}
updateResult();