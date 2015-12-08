<?php
use common\services\CarViewService;
//use jaguar\assets\AppAsset;
?>
<style type="text/css">
    input[type="slider"] {
        display: none;
    }
</style>
<div class="content">
    <div class="car-list">
        <div class="content-title">
            <div class="content-title-main">
                <ul class="title-sort" id="listSort">
                    <li class="first active"><a href="javascript:void(0)">默认排序</a></li>
                    <li><a href="javascript:void(0)" data-sort="<?php echo $options['sort']['price']['id'] ?>">价格<i class="sort"></i></a></li>
                    <li><a href="javascript:void(0)" data-sort="<?php echo $options['sort']['km']['id'] ?>">里程<i class="sort"></i></a></li>
                    <li><a href="javascript:void(0)" data-sort="<?php echo $options['sort']['age']['id'] ?>">车龄<i class="sort"></i></a></li>
                </ul>
                <div class="content-title-operate">
                    <a href="<?php echo Yii::$app->urlManager->createUrl(['search/list'])?>#index" class="return-btn return-search" id="returnIndexBtn" style="display: none;"><i>&lt;</i>返回搜索</a>
                    <a class="return-btn anew">重新选择<i class="icon-loop"></i></a>
                    <div class="prev-next" data-curPageNo="<?php echo $page['pagenow'];?>" data-carId="<?php echo empty($lists) ? '' : $lists[0]['carid'];?>" data-maxPageNo="<?php echo $page['totalpage'];?>">
                        <a class="prev"><i>&lt;</i> 上一辆车</a>
                        <a class="next">下一辆车 <i>&gt;</i></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="car-list-box" style="height:1000px;">
            <div class="car-list-search">
                <div class="car-show">
                    <ul class="car-show-smal">
                        <li class="xe <?php echo (isset($options['series'][1]) ) ? '': 'off' ?>">
                            <div class="name">
                                <span class="checkbox">
                                    <i class="checkbox-<?php echo (isset($selected['series']['1'])) ? 'off' : 'on' ?>"></i>
                                </span>/
                                <i class="txt"></i>
                            </div>
                            <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car1.png" width="110" alt="">
                        </li>
                        <li class="xf <?php echo (isset($options['series'][2]) ) ? '': 'off' ?>">
                            <div class="name">
                                <span class="checkbox">
                                    <i class="checkbox-<?php echo (isset($selected['series']['2'])) ? 'off' : 'on' ?>"></i>
                                </span>
                                <i class="txt"></i>
                            </div>
                            <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car2.png" width="110" alt="">
                        </li>
                        <li class="xf-sp <?php echo (isset($options['series'][3]) ) ? '': 'off' ?>">
                            <div class="name">
                                <span class="checkbox">
                                    <i class="checkbox-<?php echo (isset($selected['series']['3'])) ? 'off' : 'on' ?>"></i>
                                </span>
                                <i class="txt"></i>
                            </div>
                            <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car7.png" width="110" alt="" />
                        </li>
                        <li class="xj <?php echo (isset($options['series'][4]) ) ? '': 'off' ?>">
                            <div class="name">
                                <span class="checkbox">
                                    <i class="checkbox-<?php echo (isset($selected['series']['4'])) ? 'off' : 'on' ?>"></i>
                                </span>
                                <i class="txt"></i>
                            </div>
                            <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car6.png" width="110" alt="">
                        </li>
                        <li class="newxf <?php echo (isset($options['series'][5]) ) ? '': 'off' ?>">
                            <div class="name">
                                <span class="checkbox">
                                    <i class="checkbox-<?php echo (isset($selected['series']['5'])) ? 'off' : 'on' ?>"></i>
                                </span>
                                <i class="txt"></i>
                            </div>
                            <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car3.png" width="110" alt="">
                        </li>
                        <li class="ftype <?php echo (isset($options['series'][6]) ) ? '': 'off' ?>">
                            <div class="name">
                                <span class="checkbox">
                                    <i class="checkbox-<?php echo (isset($selected['series']['6'])) ? 'off' : 'on' ?>"></i>
                                </span>
                                <i class="txt"></i>
                            </div>
                            <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car4.png" width="110" alt="">
                        </li>
                        <li class="ftype1 <?php echo (isset($options['series'][7]) ) ? '': 'off' ?>">
                            <div class="name">
                                <span class="checkbox">
                                    <i class="checkbox-<?php echo (isset($selected['series']['7'])) ? 'off' : 'on' ?>"></i>
                                </span>
                                <i class="txt"></i>
                            </div>
                            <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car5.png" width="110" alt="">
                        </li>

                    </ul>
                    <ul class="car-show-big">
                        <li class="xe <?php echo (isset($options['series'][1]) ) ? '': 'off' ?>">
                            <div class="name">
                                <span class="checkbox">
                                    <i class="checkbox-<?php echo (isset($selected['series']['1'])) ? 'off' : 'on' ?>"></i>
                                </span>
                                <i class="txt"></i>
                            </div>
                            <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car1.png" width="172" height="51" alt="" />
                        </li>
                        <li class="xf <?php echo (isset($options['series'][2]) ) ? '': 'off' ?>">
                            <div class="name">
                                <span class="checkbox">
                                    <i class="checkbox-<?php echo (isset($selected['series']['2'])) ? 'off' : 'on' ?>"></i>
                                </span>
                                <i class="txt"></i>
                            </div>
                            <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car2.png" width="164" height="53" alt="" />
                        </li>
                        <li class="xf-sp <?php echo (isset($options['series'][3]) ) ? '': 'off' ?>">
                            <div class="name">
                                <span class="checkbox">
                                    <i class="checkbox-<?php echo (isset($selected['series']['3'])) ? 'off' : 'on' ?>"></i>
                                </span>
                                <i class="txt"></i>
                            </div>
                            <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car7.png" width="170" height="55" alt="" />
                        </li>
                        <li class="xj <?php echo (isset($options['series'][4]) ) ? '': 'off' ?>">
                            <div class="name">
                                <span class="checkbox">
                                    <i class="checkbox-<?php echo ( isset($selected['series']['4'])) ? 'off' : 'on' ?>"></i>
                                </span>
                                <i class="txt"></i>
                            </div>
                            <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car6.png" width="183" height="50" alt="" />
                        </li>
                        <li class="newxf <?php echo (isset($options['series'][5]) ) ? '': 'off' ?>">
                            <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car3.png" width="172" height="51" alt="" />
                            <div class="name">
                                <span class="checkbox">
                                    <i class="checkbox-<?php echo (isset($selected['series']['5'])) ? 'off' : 'on' ?>"></i>
                                </span>
                                <i class="txt"></i>
                            </div>
                        </li>
                        <li class="ftype <?php echo (isset($options['series'][6]) ) ? '': 'off' ?>">
                            <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car4.png" width="164" height="53" alt="" />
                            <div class="name">
                                <span class="checkbox">
                                    <i class="checkbox-<?php echo (isset($selected['series']['6'])) ? 'off' : 'on' ?>"></i>
                                </span>
                                <i class="txt"></i>
                            </div>
                        </li>
                        <li class="ftype1 <?php echo (isset($options['series'][7]) ) ? '': 'off' ?>">
                            <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car5.png" width="156" height="50" alt="" />
                            <div class="name">
                                <span class="checkbox">
                                    <i class="checkbox-<?php echo (isset($selected['series']['7'])) ? 'off' : 'on' ?>"></i>
                                </span>
                                <i class="txt"></i>
                            </div>
                        </li>

                    </ul>
                </div>
                <div class="index-search car-list-left w1280-module-1">
                    <p class="til">所在地区</p>
                    <div class="search-box">
                        <select id="province">
                            <option value="all">全部省份</option>
                            <?php if (isset($options['province'])):?>
                            <?php foreach ($options['province'] as $val) :?>
                                <option value="<?php echo $val['nickName']?>" <?php echo (isset($selected['province_py']) && $selected['province_py']['nickName'] == $val['nickName']) ? 'selected="selected"' : ''?>><?php echo $val['name']?></option>
                            <?php endforeach;?>
                            <?php endif;?>
                        </select>
                        <select id="city">
                            <option value="all">全部城市</option>
                            <?php if (isset($selected['province_py'])):?>
                            <?php foreach ($options['city'] as $val) :?>
                                <option value="<?php echo $val['nickName']?>" <?php echo (isset($selected['city_py']) && $selected['city_py']['nickName'] == $val['nickName']) ? 'selected="selected"' : ''?>><?php echo $val['name']?></option>
                            <?php endforeach;?>
                            <?php endif;?>
                        </select>
                    </div>
                </div>
                <div class="index-search car-list-left w1280-module-2">
                    <p class="til">价格（万元）</p>
                    <div class="layout-slider">
                      <input id="filter-price" type="slider" name="area" value="0;70"/>
                    </div>
                </div>
                <div class="index-search car-list-left w1280-module-3">
                    <p class="til">里程（万公里）</p>
                    <div class="layout-slider">
                      <input id="filter-mileage" type="slider" name="area" value="0;70" />
                    </div>
                </div>
                <div class="index-search car-list-left w1280-module-4">
                    <p class="til">车龄（年）</p>
                    <div class="layout-slider">
                      <input id="filter-age" type="slider" name="area" value="0;70" />
                    </div>
                </div>
                <div class="car-list-left w1280-module-5">
                    <p class="til">颜色</p>
                    <div class="color-box">
                        <ul class="color">
                            <?php foreach ($attr['color'] as $key => $val): ?>
                            <li class="c<?php echo $key;?> <?php echo (isset($selected['color']) && $selected['color']['nickName'] == $key) ? 'on-b' : (empty($options['color'][$key]) ? 'off-b' : '')?>" data-index="<?php echo $key;?>"><i></i><span><?php echo isset($options['color'][$key]) ? '('.$options['color'][$key]['count'].')' :''?></span></li>
                            <?php endforeach;?>
                        </ul>
                    </div>
                </div>
                <div class="car-list-left oil-speed w1280-module-6">
                    <p class="til">变速箱</p>
                    <ul>
                        <?php foreach ($attr['bsfs'] as $key => $val) :?>
                        <li class="<?php echo !isset($options['bsfs'][$key]) ? 'disabled' : "" ?>" data-id="<?php echo $key;?>">
                            <span class="checkbox">
                                <i class="checkbox-on"></i>
                            </span>
                            <?php echo $val;?>（<?php echo isset($options['bsfs'][$key]) ? $options['bsfs'][$key]['count'] : 0 ?>）
                        </li>
                        <?php endforeach;?>
                    </ul>
                </div>
                <div class="car-list-left engine w1280-module-7">
                    <p class="til">排量</p>
                    <div class="engine-box">
                        <ul>
                            <?php foreach ($attr['pql'] as $key => $val) :?>
                            <li class="<?php echo isset($options['pql'][$key]) ? "" : "disabled" ?>">
                                <span class="checkbox">
                                    <i class="checkbox-<?php echo (isset($selected['pql']) && $selected['pql']['nickName'] == $key) ? 'off' : 'on' ?>"></i>
                                </span>
                                <span class="title"><?php echo $val;?></span>
                            </li>
                            <?php endforeach;?>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="detail-list">
                <div class="detail-list-main" id="searchList">
                    <div class="return-quantity">
                        <a href="#index" class="return-btn list-return-btn" style="display: none;"><i>&lt;</i>返回搜索</a>
                        <div class="quantity">
                            <span class="font-txt"><?php echo $page['total_number']?></span>
                            <span class="txt">辆匹配车源</span>
                        </div>
                    </div>
                    <div class="result clearfix">
                        <div class="result-fl">
                            <div class="print">
                                <span>打印当前列表</span>
                            </div>
                        </div>
                        <div class="result-fr">
                            <div class="page">
                                <?php if ($page['pagenow'] != 1):?>
                                    <a >&lt;</a>
                                <?php else : ?>
                                    <span>&lt;</span>
                                <?php endif;?>
                                <?php for($i = $page['from'];$i <= $page['to']; $i++):?>
                                    <a class="<?php echo ($i == $page['pagenow'])?'active':''?>"><?php echo $i;?></a>
                                <?php endfor;?>
                                <?php if ($page['pagenow'] != $page['totalpage']):?>
                                    <a>&gt;</a>
                                <?php else : ?>
                                    <span>&gt;</span>
                                <?php endif;?>
                            </div>
                        </div>
                    </div>
                    <ul class="join-car-list">
                    <?php foreach ($lists as $key => $val):?>
                        <li>
                            <div class="img" data-id="<?php echo $val['carid']?>" data-city="<?php echo $val['city'];?>" data-color="<?php echo $val['color'];?>" data-bsfs="<?php echo $val['bsfs'] == 1 ? '手自一体' : ($val['bsfs'] == 2 ? '自动' : '手动') ?>">
                                <img src="<?php echo $val['picture'];?>" width="160" height="120">
                                <span class="numeration"><i><?php echo $val['photocount']?></i></span>
                            </div>
                            <div class="txt">
                                <div class="title-price">
                                    <h4><?php echo $val['title_l'];?></h4>
                                    <span class="price"><?php echo $val['price'];?>万</span>
                                </div>
                                <p class="year" data-km="<?php echo $val['bxlc']?>" data-year="<?php echo CarViewService::firstRegDate('Y', $val['sprq']);?>"><?php echo CarViewService::firstRegDate('Y', $val['sprq']);?>年<i>|</i><?php echo $val['bxlc']?>万公里</p>
                                <p class="company"><?php echo $val['shop_name']?></p>
                                <div class="btn">
                                    <span class="glb-btn glb-btn-white comparison" data-features="<?php echo isset($feature[$val['carid']]) ? $feature[$val['carid']] : ''?>">
                                        <span class="checkbox">
                                            <i class="checkbox-<?php echo in_array($val['carid'], $compare) ? 'off' : 'on'?>"></i>
                                        </span>对比
                                    </span>
                                    <span class="glb-btn glb-btn-<?php echo in_array($val['carid'], $collect) ? 'red' : 'white'?> collect">收藏</span>
                                </div>
                            </div>
                            <i class="triangle"></i>
                        </li>
                    <?php endforeach;?>

                    </ul>
                    <div class="clearfix">
                        <div class="result-fl" id="listCompareBtn">
                            <span>对比所选&nbsp;&gt;</span>
                        </div>
                        <div class="result-fr">
                            <div class="page">
                                <?php if ($page['pagenow'] != 1):?>
                                    <a >&lt;</a>
                                <?php else : ?>
                                    <span>&lt;</span>
                                <?php endif;?>
                                <?php for($i = $page['from'];$i <= $page['to']; $i++):?>
                                    <a class="<?php echo ($i == $page['pagenow'])?'active':''?>"><?php echo $i;?></a>
                                <?php endfor;?>
                                <?php if ($page['pagenow'] != $page['totalpage']):?>
                                    <a>&gt;</a>
                                <?php else : ?>
                                    <span>&gt;</span>
                                <?php endif;?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 车详 -->
            <div class="detail-main" id="detailCont">
            </div>

            <!-- 对比 -->
            <div class="detail-main compare-main" id="compareCont">
                <div class="compare-title compare-null">
                    <h2>比较车辆</h2>
                    <p>暂无比较车辆，请至少选择2辆进行比较</p>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="overlay" style="display:none;"></div>
<div class="popup" id="popupSuccess" style="display: none;">
    <a href="javascript:void(0)" class="close"></a>
    <div class="popup-main popup-main-submit">
        <h2></h2>
        <div class="from">
            <p class="submit-ok">恭喜，您的信息已提交成功！</p>
            <dl class="btn">
                <dt></dt>
                <dd>
                    <input class="glb-btn glb-btn-red" id="formConfirmBtn" type="button" value="确认">
                </dd>
            </dl>
        </div>
    </div>
</div>
<div class="popup" style="display: none;">
    <a href="javascript:void(0)" class="close"></a>
    <div class="popup-main">
        <h2>预约试驾</h2>
        <div class="from">
            <dl>
                <dt>姓名<i>*</i></dt>
                <dd><input type="text" class="text" name="" id=""><span class="hint-red">请填写</span></dd>
            </dl>
            <dl>
                <dt>称谓<i>*</i></dt>
                <dd><div class="radio-box"><label><input type="radio" class="radio">先生</label><label><input type="radio" class="radio">女士</label></div>
                <span class="hint-red">请选择</span></dd>
            </dl>
            <dl>
                <dt>手机号<i>*</i></dt>
                <dd><input type="text" class="text" name="" id=""><span class="hint-red">请填写</span></dd>
            </dl>
            <dl>
                <dt>留言<i>&nbsp;</i></dt>
                <dd class="textarea-box"><textarea name="" id="" cols="30" rows="10"></textarea><span class="hint-red">请填写</span></dd>
            </dl>
            <dl class="btn">
                <dt></dt>
                <dd>
                    <input class="glb-btn glb-btn-red" type="button" value="提交">
                </dd>
            </dl>
        </div>
    </div>
</div>
<div class="popup" id="popupText" style="display: none;margin-left: -100px;">
    <div class="popup-main" style="width: 200px;">
        <div>
            <span class="popup-main-error hint-red"></span>
        </div>
    </div>
</div>
