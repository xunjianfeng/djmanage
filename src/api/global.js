import Vue from "vue";

let page_number = 1;	//页数
let search_type = "";	//赛事类型
let search_status = ""; //赛事状态
let search_class = "";	//赛事分类
let search_name = "";	//赛事名称
let judge = 0;



export default{
	page_number,	//设置全局变量,用来实时记录页数
	search_type, 
	search_status,
	search_class, 
	search_name,
	judge
}


