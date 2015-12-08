<?php
/* @var $this yii\web\View */
$this->title = '捷豹认证二手车';
?>
<div class="content">
    <div class="banner">
        <ul>
            <li class="active">
                <img src="<?= Yii::getAlias('@cdn')?>/assets/images/banner/0.jpg">
            </li>
            <li>
                <img src="<?= Yii::getAlias('@cdn')?>/assets/images/banner/1.jpg">
            </li>
            <li>
                <img src="<?= Yii::getAlias('@cdn')?>/assets/images/banner/2.jpg">
            </li>
            <li>
                <img src="<?= Yii::getAlias('@cdn')?>/assets/images/banner/3.jpg">
            </li>
            <li>
                <img src="<?= Yii::getAlias('@cdn')?>/assets/images/banner/4.jpg">
            </li>
            <li>
                <img src="<?= Yii::getAlias('@cdn')?>/assets/images/banner/5.jpg">
            </li>
            <li>
                <img src="<?= Yii::getAlias('@cdn')?>/assets/images/banner/6.jpg">
            </li>
            <li>
                <img src="<?= Yii::getAlias('@cdn')?>/assets/images/banner/7.jpg">
            </li>
        </ul>
    </div>
    <div class="breadcrumb">
        <div class="breadcrumb-main">
            <div class="inx-tabs">
                <a class="active" href="javascript:void(0)">选择捷豹认证二手车</a>
            </div>
        </div>
    </div>
    <form id="homeForm" action="/search/list/#index" method="POST">
        <div class="car-show-search">
            <div class="car-show">
                <ul>
                    <li class="xe <?php echo (isset($options['series'][1]) ) ? '': 'off' ?>">
                        <div class="name" data-sid="3105">
                            <span class="checkbox">
                                <i class="checkbox-on" data-val="1"></i>
                            </span>
                            <i class="txt"></i>
                        </div>
                        <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car1.png" width="172" height="51" alt="" />
                    </li>
                    <li class="xf <?php echo (isset($options['series'][2]) ) ? '': 'off' ?>">
                        <div class="name" data-sid="1197">
                            <span class="checkbox">
                                <i class="checkbox-on" data-val="2"></i>
                            </span>
                            <i class="txt"></i>
                        </div>
                        <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car2.png" width="164" height="53" alt="" />
                    </li>
                    <li class="xf-sp <?php echo (isset($options['series'][3]) ) ? '': 'off' ?>">
                        <!-- 这辆车需要改data-sid为XF-Sportbarke的id -->
                        <div class="name" data-sid="803">
                            <span class="checkbox">
                                <i class="checkbox-on" data-val="3"></i>
                            </span>
                            <i class="txt"></i>
                        </div>
                        <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car7.png" width="170" height="55" alt=""/>
                    </li>
                    <li class="xj <?php echo (isset($options['series'][4]) ) ? '': 'off' ?>">
                        <div class="name" data-sid="803">
                            <span class="checkbox">
                                <i class="checkbox-on" data-val="4"></i>
                            </span>
                            <i class="txt"></i>
                        </div>
                        <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car6.png" width="183" height="50" alt=""/>
                    </li>
                    <li class="newxf <?php echo (isset($options['series'][5]) ) ? '': 'off' ?>">
                        <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car3.png" width="172" height="51" alt="" />
                        <div class="name" data-sid="2675">
                            <span class="checkbox">
                                <i class="checkbox-on" data-val="5"></i>
                            </span>
                            <i class="txt"></i>
                        </div>
                    </li>
                    <li class="ftype <?php echo (isset($options['series'][6]) ) ? '': 'off' ?>">
                        <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car4.png" width="164" height="53" alt="" />
                        <div class="name" data-sid="2933">
                            <span class="checkbox">
                                <i class="checkbox-on" data-val="6"></i>
                            </span>
                            <i class="txt"></i>
                        </div>
                    </li>
                    <li class="ftype1 <?php echo (isset($options['series'][7]) ) ? '': 'off' ?>">
                        <img src="<?= Yii::getAlias('@cdn')?>/assets/images/car5.png" width="156" height="50" alt="" />
                        <div class="name" data-sid="2933" >
                            <span class="checkbox">
                                <i class="checkbox-on" data-val="7"></i>
                            </span>
                            <i class="txt"></i>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="index-search">
                <div class="search-box">
                    <select id="province">
                        <option value="all">全部省份</option>
                        <?php if (isset($options['province'])):?>
                        <?php foreach ($options['province'] as $key => $val): ?>
                             <option value="<?php echo $val['nickName']?>"><?php echo $val['name']?></option>
                        <?php endforeach;?>
                        <?php endif;?>
                    </select>
                    <select id="city">
                        <option value="all" selected="selected">全部城市</option>
                        <?php if (isset($param['province_py']) && isset($options['city'])):?>
                        <?php foreach ($options['city'] as $key => $val): ?>
                            <option value="<?php echo $val['nickName']?>"><?php echo $val['name']?></option>
                        <?php endforeach;?>
                        <?php endif;?>
                    </select>
                    <span class="font-txt"><?php echo $totalNumber?></span>
                    <span class="txt">匹配车辆</span>
                    <input type="button" class="glb-btn" id="searchBtn" value="搜索" />
                </div>
            </div>
        </div>
    </form>
    <div class="adorn"></div>
    <div class="commitment">
        <div class="text">
            <span class="title">我们对您的承诺</span>
            <div class="mark">
                <span class="txt">无论是新车还是认证二手车，每辆捷豹自诞生之日就天赋非凡生命力。认证二手车会如诞生时一样，被注入年轻且富有活力的驾驭基因，让您开启无忧驾行。认证二手车确保了每辆捷豹在交付车主时车况完美无瑕，尽释速度与激情。选择捷豹，享受承诺。</span>
            </div>
        </div>
        <div class="warranty">
            <p class="title">2年免费质量保修</p>
            <p>与所有新车一样，经由认证的捷豹二手车享受进口原厂专属配件保修：所有突发机械与电气故障均由捷豹专业技师维修保养；2年质保期内，一旦收到相关信息，立刻启动索赔流程；质保服务均由捷豹官方授权的经销商提供，确保纯正品质。</p>

            <p class="title">同于新车标准的24个月24小时道路救援</p>
            <p>捷豹道路救援提供全方位救援服务，服务内容包括不可预测的车辆无法移动、爆胎等故障，及钥匙遗失等微小突发事件。2年质保期内，捷豹道路救援服务将全年365天，全天24小时随时待命，免去车主后顾之忧。此外，捷豹道路救援还包括：车辆启动故障支持、继续行路故障支持、车辆维护、住宿安排等。适用于所有条款。</p>

            <p class="title">165项多点检测</p>
            <p>为确保每辆捷豹的机械与电气处于最佳状态，车身焕然如新，捷豹认证二手车的检测清单共包含165项多点检测内容。捷豹将提供最尖端的技术、工具和检测设备，经由捷豹专业技师严格检测，审查漆面、内饰、发动机整备、路试和最终检测后，才可获得签字认证。只有通过165项专业检测的二手车才能成为捷豹认证二手车。</p>
            
            <p class="title">我们的专业技师</p>
            <p>捷豹认证二手车的整备工作，均由具备专业知识技能、关注细节的捷豹专业技师使用专用工具、检测设备及原厂配件完成。为确保始终达到最严格标准，所有整备工作只由官方授权的经销商完成。</p>

            <p class="title">里程和维修保养记录确认</p>
            <p>每台捷豹认证二手车都会提供里程和维修保养记录。里程审查是对每位车主的基本承诺，以确保车主充分了解认证二手车的历史情况后，根据车况安心驾控，安全出行。</p>

            <p class="title">由捷豹专业技师完成的路试评估</p>
            <p>每辆捷豹二手车在道路检测时，均经由捷豹专业技师进行性能评估：包括悬挂、减震和制动系统、引擎性能、变速箱等九项内容，以确保车辆性能保持最佳状态。通过严格路试测验，捷豹认证二手车将如同新生般，被注入年轻且富有活力的驾驭基因。</p>

            <p class="title">独立审计</p>
            <p>为保证捷豹品牌及经销商始终如一的高品质，服务、设施和人员需通过独立的审计流程，内容包括保养设备及车辆本身，涵盖车主能接触到的认证二手车项目所谓所有方面。</p>
        </div>
    </div>
</div>
<div class="footer">
    <div class="footer-main">
        <ul class="footer-main-series">
            <li><a class="<?php echo (isset($options['series'][1]) ) ? '': 'off' ?>">捷豹XE</a></li>
            <li><a class="<?php echo (isset($options['series'][2]) ) ? '': 'off' ?>">捷豹XF</a></li>
            <li><a class="<?php echo (isset($options['series'][3]) ) ? '': 'off' ?>">捷豹XF Sportbrake</a></li>
            <li><a class="<?php echo (isset($options['series'][4]) ) ? '': 'off' ?>">捷豹XJ</a></li>
            <li><a class="<?php echo (isset($options['series'][5]) ) ? '': 'off' ?>">捷豹XK</a></li>
            <li><a class="<?php echo (isset($options['series'][6]) ) ? '': 'off' ?>">捷豹F-TYPE</a></li>
            <li><a class="<?php echo (isset($options['series'][7]) ) ? '': 'off' ?>">捷豹F-TYPE敞篷</a></li>
        </ul>
        <i></i>
        <ul class="footer-main-last">
            <li><a href="http://www.jaguar.com.cn/index.html" target="_blank">捷豹中国</a></li>
            <li><a href="http://www.jaguar.com.cn/privacy-legal.html" target="_blank">隐私政策</a></li>
            <li><a href="http://www.jaguar.com.cn/accessibility.html" target="_blank">可访问性</a></li>
            <li><a href="http://www.jaguar.com.cn/terms-conditions.html" target="_blank">条件与条款</a></li>
            <li><a>沪ICP备100162号</a></li>
        </ul>
    </div>
</div>