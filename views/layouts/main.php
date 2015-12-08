<?php
use yii\helpers\Html;
use jaguar\assets\AppAsset;


/* @var $this \yii\web\View */
/* @var $content string */
AppAsset::register($this);

?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>">
<head>
    <meta http-equiv="content-type" content="text/html; charset=<?= Yii::$app->charset ?>">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <title><?= Html::encode($this->title) ?></title>
    <?php $this->head() ?>
    <script type="text/javascript" src="<?= Yii::getAlias('@cdn')?>/assets/libs/respond/respond.js"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=pUUs4MPrF4IHIsykAWKqrQuC"></script>
    <script type="text/javascript" src="<?= Yii::getAlias('@cdn')?>/assets/libs/requirejs/require.js" data-main="<?= Yii::getAlias('@cdn')?>/app/config.js"></script>
</head>
<body class="w1280">
    <?php $this->beginBody() ?>
    <div class="wrap">
        <div class="header">
            <div class="head-main">
                <h1 class="logo"><img src="<?= Yii::getAlias('@cdn')?>/assets/images/logo.png" width="86" height="39" alt="" /></h1>
                <div class="head-fl"><a href="http://www.jaguar.com.cn/index.html">返回捷豹中国</a><a href="/">捷豹认证二手车</a></div>
                <div class="head-fr"><a href="/search/list/#compare">我的对比(?)</a><a href="/search/list/#collection">我的收藏(?)</a></div>
            </div>
        </div>
        <?= $content ?>
        

    </div>
    <?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>

