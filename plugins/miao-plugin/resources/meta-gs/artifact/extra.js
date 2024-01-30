import lodash from 'lodash'
import { Format } from '#miao'

export const mainAttr = {
  3: 'atk,def,hp,mastery,recharge'.split(','),
  4: 'atk,def,hp,mastery,dmg,phy'.split(','),
  5: 'atk,def,hp,mastery,heal,cpct,cdmg'.split(',')
}

export const subAttr = 'atk,atkPlus,def,defPlus,hp,hpPlus,mastery,recharge,cpct,cdmg'.split(',')

/**
 * 圣遗物词条配置
 * @[]value 副词条单次提升值（最大档位）
 * @[]valueMin 副词条单次提升最小值
 * @[]calc 伤害计算时变更的字段type
 * @[]type 词条的类型 normal:普通字段 plus:小词条
 * @[]base 词条类型为小词条时，对应的大词条
 * @[]text 展示文字
 */
export const attrMap = {
  atk: { title: '大攻击', format: 'pct', calc: 'pct' },
  atkPlus: { title: '小攻击', format: 'comma' },
  def: { title: '大防御', format: 'pct', calc: 'pct' },
  defPlus: { title: '小防御', format: 'comma' },
  hp: { title: '大生命', format: 'pct', calc: 'pct' },
  hpPlus: { title: '小生命', format: 'comma' },
  cpct: { title: '暴击率', format: 'pct', calc: 'plus' },
  cdmg: { title: '暴击伤害', format: 'pct', calc: 'plus' },
  mastery: { title: '元素精通', format: 'comma', calc: 'plus' },
  recharge: { title: '充能效率', format: 'pct', calc: 'plus' },
  dmg: { title: '元素伤害', format: 'pct', calc: 'plus' },
  phy: { title: '物伤加成', format: 'pct', calc: 'plus' },
  heal: { title: '治疗加成', format: 'pct', calc: 'plus' }
}

// const basicNum = 23.312 / 6
export const basicNum = 3.885
export const attrPct = {
  atk: 1.5,
  atkPlus: 5,
  def: 1.875,
  defPlus: 6,
  hp: 1.5,
  hpPlus: 1.875 * 41,
  cpct: 1,
  cdmg: 2,
  mastery: 6,
  recharge: 1 / 0.6,
  dmg: 1.5,
  phy: 1.875,
  heal: 1.5 / 1.3
}

let anMap = {}
lodash.forEach(attrMap, (attr, key) => {
  anMap[attr.title] = key
  if (attrPct[key]) {
    // 设置value
    attr.value = basicNum * attrPct[key]

    // 设置valueMin
    if (subAttr.includes(key)) {
      attr.valueMin = basicNum * attrPct[key] * 0.7
    }
    // 设置type
    attr.base = { hpPlus: 'hp', atkPlus: 'atk', defPlus: 'def' }[key]
    attr.type = attr.base ? 'plus' : 'normal'

    // 设置展示文字
    attr.text = Format[attr.format](attr.value, 2)
  }
})
export const attrNameMap = anMap

// ids映射关系
export const mainIdMap = {
  10001: 'hpPlus',
  10002: 'hp',
  10003: 'atkPlus',
  10004: 'atk',
  10005: 'defPlus',
  10006: 'def',
  10007: 'recharge',
  10008: 'mastery',
  12001: 'atkPlus',
  13001: 'hpPlus',
  13002: 'hp',
  13003: 'atkPlus',
  13004: 'atk',
  13005: 'defPlus',
  13006: 'def',
  13007: 'cpct',
  13008: 'cdmg',
  13009: 'heal',
  13010: 'mastery',
  14001: 'hpPlus',
  15001: 'hpPlus',
  15002: 'hp',
  15003: 'atkPlus',
  15004: 'atk',
  15005: 'defPlus',
  15006: 'def',
  15007: 'mastery',
  15008: 'pyro',
  15009: 'electro',
  15010: 'cryo',
  15011: 'hydro',
  15012: 'anemo',
  15013: 'geo',
  15014: 'dendro',
  15015: 'phy',
  10990: 'atk',
  10980: 'hp',
  10970: 'def',
  10960: 'recharge',
  10950: 'mastery',
  30990: 'atk',
  30980: 'hp',
  30970: 'def',
  30960: 'cpct',
  30950: 'cdmg',
  30940: 'heal',
  30930: 'mastery',
  50990: 'atk',
  50980: 'hp',
  50970: 'def',
  50960: 'pyro',
  50950: 'electro',
  50940: 'cryo',
  50930: 'hydro',
  50920: 'anemo',
  50910: 'geo',
  50900: 'dendro',
  50890: 'phy',
  50880: 'mastery'
}

export const attrIdMap = {
  101021: { key: 'hpPlus', value: 23.899999618530273 },
  101022: { key: 'hpPlus', value: 29.8799991607666 },
  201021: { key: 'hpPlus', value: 50.189998626708984 },
  201022: { key: 'hpPlus', value: 60.95000076293945 },
  201023: { key: 'hpPlus', value: 71.69999694824219 },
  301021: { key: 'hpPlus', value: 100.37999725341797 },
  301022: { key: 'hpPlus', value: 114.7200012207031 },
  301023: { key: 'hpPlus', value: 129.05999755859375 },
  301024: { key: 'hpPlus', value: 143.39999389648438 },
  401021: { key: 'hpPlus', value: 167.3000030517578 },
  401022: { key: 'hpPlus', value: 191.1999969482422 },
  401023: { key: 'hpPlus', value: 215.1000061035156 },
  401024: { key: 'hpPlus', value: 239.0 },
  501021: { key: 'hpPlus', value: 209.1300048828125 },
  501022: { key: 'hpPlus', value: 239.0 },
  501023: { key: 'hpPlus', value: 268.8800048828125 },
  501024: { key: 'hpPlus', value: 298.75 },
  101031: { key: 'hp', value: 0.011699999682605267 },
  101032: { key: 'hp', value: 0.014600000344216824 },
  201031: { key: 'hp', value: 0.016300000250339508 },
  201032: { key: 'hp', value: 0.01979999989271164 },
  201033: { key: 'hp', value: 0.02329999953508377 },
  301031: { key: 'hp', value: 0.02449999935925007 },
  301032: { key: 'hp', value: 0.02800000086426735 },
  301033: { key: 'hp', value: 0.03150000050663948 },
  301034: { key: 'hp', value: 0.03500000014901161 },
  401031: { key: 'hp', value: 0.032600000500679016 },
  401032: { key: 'hp', value: 0.037300001829862595 },
  401033: { key: 'hp', value: 0.041999999433755875 },
  401034: { key: 'hp', value: 0.04659999907016754 },
  501031: { key: 'hp', value: 0.040800001472234726 },
  501032: { key: 'hp', value: 0.04659999907016754 },
  501033: { key: 'hp', value: 0.05249999836087227 },
  501034: { key: 'hp', value: 0.05829999968409538 },
  101051: { key: 'atkPlus', value: 1.559999942779541 },
  101052: { key: 'atkPlus', value: 1.9500000476837158 },
  201051: { key: 'atkPlus', value: 3.2699999809265137 },
  201052: { key: 'atkPlus', value: 3.9700000286102295 },
  201053: { key: 'atkPlus', value: 4.670000076293945 },
  301051: { key: 'atkPlus', value: 6.539999961853027 },
  301052: { key: 'atkPlus', value: 7.46999979019165 },
  301053: { key: 'atkPlus', value: 8.399999618530273 },
  301054: { key: 'atkPlus', value: 9.34000015258789 },
  401051: { key: 'atkPlus', value: 10.890000343322754 },
  401052: { key: 'atkPlus', value: 12.449999809265137 },
  401053: { key: 'atkPlus', value: 14.0 },
  401054: { key: 'atkPlus', value: 15.5600004196167 },
  501051: { key: 'atkPlus', value: 13.619999885559082 },
  501052: { key: 'atkPlus', value: 15.5600004196167 },
  501053: { key: 'atkPlus', value: 17.510000228881836 },
  501054: { key: 'atkPlus', value: 19.450000762939453 },
  101061: { key: 'atk', value: 0.011699999682605267 },
  101062: { key: 'atk', value: 0.014600000344216824 },
  201061: { key: 'atk', value: 0.016300000250339508 },
  201062: { key: 'atk', value: 0.01979999989271164 },
  201063: { key: 'atk', value: 0.02329999953508377 },
  301061: { key: 'atk', value: 0.02449999935925007 },
  301062: { key: 'atk', value: 0.02800000086426735 },
  301063: { key: 'atk', value: 0.03150000050663948 },
  301064: { key: 'atk', value: 0.03500000014901161 },
  401061: { key: 'atk', value: 0.032600000500679016 },
  401062: { key: 'atk', value: 0.037300001829862595 },
  401063: { key: 'atk', value: 0.041999999433755875 },
  401064: { key: 'atk', value: 0.04659999907016754 },
  501061: { key: 'atk', value: 0.040800001472234726 },
  501062: { key: 'atk', value: 0.04659999907016754 },
  501063: { key: 'atk', value: 0.05249999836087227 },
  501064: { key: 'atk', value: 0.05829999968409538 },
  101081: { key: 'defPlus', value: 1.850000023841858 },
  101082: { key: 'defPlus', value: 2.309999942779541 },
  201081: { key: 'defPlus', value: 3.890000104904175 },
  201082: { key: 'defPlus', value: 4.71999979019165 },
  201083: { key: 'defPlus', value: 5.559999942779541 },
  301081: { key: 'defPlus', value: 7.78000020980835 },
  301082: { key: 'defPlus', value: 8.890000343322754 },
  301083: { key: 'defPlus', value: 10.0 },
  301084: { key: 'defPlus', value: 11.109999656677246 },
  401081: { key: 'defPlus', value: 12.960000038146973 },
  401082: { key: 'defPlus', value: 14.819999694824219 },
  401083: { key: 'defPlus', value: 16.670000076293945 },
  401084: { key: 'defPlus', value: 18.520000457763672 },
  501081: { key: 'defPlus', value: 16.200000762939453 },
  501082: { key: 'defPlus', value: 18.520000457763672 },
  501083: { key: 'defPlus', value: 20.829999923706055 },
  501084: { key: 'defPlus', value: 23.149999618530273 },
  101091: { key: 'def', value: 0.014600000344216824 },
  101092: { key: 'def', value: 0.018200000748038292 },
  201091: { key: 'def', value: 0.020400000736117363 },
  201092: { key: 'def', value: 0.024800000712275505 },
  201093: { key: 'def', value: 0.029100000858306885 },
  301091: { key: 'def', value: 0.03060000017285347 },
  301092: { key: 'def', value: 0.03500000014901161 },
  301093: { key: 'def', value: 0.03929999843239784 },
  301094: { key: 'def', value: 0.043699998408555984 },
  401091: { key: 'def', value: 0.040800001472234726 },
  401092: { key: 'def', value: 0.04659999907016754 },
  401093: { key: 'def', value: 0.05249999836087227 },
  401094: { key: 'def', value: 0.05829999968409538 },
  501091: { key: 'def', value: 0.050999999046325684 },
  501092: { key: 'def', value: 0.05829999968409538 },
  501093: { key: 'def', value: 0.06560000032186508 },
  501094: { key: 'def', value: 0.07289999723434448 },
  101231: { key: 'recharge', value: 0.013000000268220901 },
  101232: { key: 'recharge', value: 0.016200000420212746 },
  201231: { key: 'recharge', value: 0.01810000091791153 },
  201232: { key: 'recharge', value: 0.02199999988079071 },
  201233: { key: 'recharge', value: 0.02590000070631504 },
  301231: { key: 'recharge', value: 0.0272000003606081 },
  301232: { key: 'recharge', value: 0.031099999323487282 },
  301233: { key: 'recharge', value: 0.03500000014901161 },
  301234: { key: 'recharge', value: 0.03889999911189079 },
  401231: { key: 'recharge', value: 0.03629999980330467 },
  401232: { key: 'recharge', value: 0.0414000004529953 },
  401233: { key: 'recharge', value: 0.04659999907016754 },
  401234: { key: 'recharge', value: 0.05180000141263008 },
  501231: { key: 'recharge', value: 0.04529999941587448 },
  501232: { key: 'recharge', value: 0.05180000141263008 },
  501233: { key: 'recharge', value: 0.05829999968409538 },
  501234: { key: 'recharge', value: 0.06480000168085098 },
  101241: { key: 'mastery', value: 4.659999847412109 },
  101242: { key: 'mastery', value: 5.829999923706055 },
  201241: { key: 'mastery', value: 6.53000020980835 },
  201242: { key: 'mastery', value: 7.929999828338623 },
  201243: { key: 'mastery', value: 9.329999923706055 },
  301241: { key: 'mastery', value: 9.789999961853027 },
  301242: { key: 'mastery', value: 11.1899995803833 },
  301243: { key: 'mastery', value: 12.59000015258789 },
  301244: { key: 'mastery', value: 13.989999771118164 },
  401241: { key: 'mastery', value: 13.0600004196167 },
  401242: { key: 'mastery', value: 14.920000076293945 },
  401243: { key: 'mastery', value: 16.790000915527344 },
  401244: { key: 'mastery', value: 18.649999618530273 },
  501241: { key: 'mastery', value: 16.31999969482422 },
  501242: { key: 'mastery', value: 18.649999618530273 },
  501243: { key: 'mastery', value: 20.979999542236328 },
  501244: { key: 'mastery', value: 23.309999465942383 },
  101201: { key: 'cpct', value: 0.007799999788403511 },
  101202: { key: 'cpct', value: 0.009700000286102295 },
  201201: { key: 'cpct', value: 0.010900000110268593 },
  201202: { key: 'cpct', value: 0.013199999928474426 },
  201203: { key: 'cpct', value: 0.01549999974668026 },
  301201: { key: 'cpct', value: 0.016300000250339508 },
  301202: { key: 'cpct', value: 0.01860000006854534 },
  301203: { key: 'cpct', value: 0.020999999716877937 },
  301204: { key: 'cpct', value: 0.02329999953508377 },
  401201: { key: 'cpct', value: 0.021800000220537186 },
  401202: { key: 'cpct', value: 0.024900000542402267 },
  401203: { key: 'cpct', value: 0.02800000086426735 },
  401204: { key: 'cpct', value: 0.031099999323487282 },
  501201: { key: 'cpct', value: 0.0272000003606081 },
  501202: { key: 'cpct', value: 0.031099999323487282 },
  501203: { key: 'cpct', value: 0.03500000014901161 },
  501204: { key: 'cpct', value: 0.03889999911189079 },
  101221: { key: 'cdmg', value: 0.01549999974668026 },
  101222: { key: 'cdmg', value: 0.01940000057220459 },
  201221: { key: 'cdmg', value: 0.021800000220537186 },
  201222: { key: 'cdmg', value: 0.026399999856948853 },
  201223: { key: 'cdmg', value: 0.031099999323487282 },
  301221: { key: 'cdmg', value: 0.032600000500679016 },
  301222: { key: 'cdmg', value: 0.037300001829862595 },
  301223: { key: 'cdmg', value: 0.041999999433755875 },
  301224: { key: 'cdmg', value: 0.04659999907016754 },
  401221: { key: 'cdmg', value: 0.04349999874830246 },
  401222: { key: 'cdmg', value: 0.04969999939203262 },
  401223: { key: 'cdmg', value: 0.0560000017285347 },
  401224: { key: 'cdmg', value: 0.062199998646974564 },
  501221: { key: 'cdmg', value: 0.0544000007212162 },
  501222: { key: 'cdmg', value: 0.062199998646974564 },
  501223: { key: 'cdmg', value: 0.06989999860525131 },
  501224: { key: 'cdmg', value: 0.07769999653100967 }
}
