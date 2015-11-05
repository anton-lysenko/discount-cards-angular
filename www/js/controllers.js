angular.module('app.controllers', ['ngCordova', 'app.services', 'ionic'])

.controller('discountCardsCtrl', function ($scope, $state) {
  $scope.addCard = function () {
    $state.go('selectCardCategory');
  }

})

.controller('comfyDiscountCtrl', function ($scope) {
  var vm = $scope;

})
.controller('selectCardCategoryCtrl', function ($scope, $state, NewCard) {
  var vm = $scope;
  vm.newCard = NewCard;
  vm.cardCategories = [
    {
      text: 'Common',
      value: 'common'
    },
    {
      text: 'Food',
      value: 'food'
    },
    {
      text: 'Cosmetics',
      value: 'cosmetics'
    },
    {
      text: 'Sports goods',
      value: 'sports_goods'
    },
    {
      text: 'Clothes',
      value: 'clothes'
    },
    {
      text: 'Electronics',
      value: 'electronics'
    },
  ];
  vm.next = function () {
    $state.go('addCardBarcode');
  }
})
.controller('addCardBarcodeCtrl', function ($scope, $state, $ionicPlatform, $cordovaBarcodeScanner, NewCard) {
  var vm = $scope;
  $ionicPlatform.ready(function () {
//    $scope.barcode = {
//      value: '0000000000000',
//      format: ''
//    };
    vm.newCard = NewCard;
    vm.barcodeValue = '0000000000000';
    vm.scanBarcode = function () {
      $cordovaBarcodeScanner
        .scan()
        .then(function (barcodeData) {
          vm.newCard.barcode.value = barcodeData.text;
          vm.newCard.barcode.format = barcodeData.format;
        }, function (error) {
          alert(error);
        });

    }

    vm.next = function () {
      $state.go('addCardPhoto');
    }

  });

})

.controller('addCardPhotoCtrl', function ($scope, Camera, $ionicPlatform) {
  $ionicPlatform.ready(function () {

    $scope.getPhoto = function () {
      Camera.getPicture().then(function (imageURI) {
        console.log(imageURI);
        $scope.lastPhoto = imageURI;
      }, function (err) {
        console.err(err);
      }, {
        quality: 100,
        targetWidth: 320,
        targetHeight: 320,
        saveToPhotoAlbum: false
      });
    };

  });

})
