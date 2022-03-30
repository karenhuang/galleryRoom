const express = require('express')
const router = express.Router()
let response
router.use(function (req, res, next) {
  response = {
    status: 'Fail',
    data: null,
    message: null
  }
  next()
})

router.route('/logo')
  .get(function (req, res, next) {
    response.status = 'Success'
    response.data = {
      vue: {
        title: 'The Progressive <br> JavaScript Framework',
        link: [{
          content: 'GET STARTED',
          href: 'https://vuejs.org/v2/guide/',
          type: 0,
          target: '_blank'
        }, {
          content: 'GITHUB',
          href: 'https://github.com/vuejs/vue',
          type: 1,
          target: '_blank'
        }]
      }
    }
    response.message = null
    res.json(response)
  })
router.route('/list')
  .get(function (req, res, next) {
    response.status = 'Success'
    response.data = {
      list: [{
        title: 'Approachable',
        description: 'Already know HTML, CSS and JavaScript? Read the guide and start building things in no time!'
      }, {
        title: 'Versatile',
        description: 'Simple, minimal core with an incrementally adoptable stack that can handle apps of any scale.'
      }, {
        title: 'Performant',
        description: '19kb min+gzip Runtime <br> Blazing Fast Virtual DOM <br> Minimal Optimization Efforts.'
      }]
    }
    response.message = null
    res.json(response)
  })



router.route('/gallery')
  .get(function (req, res, next) {
    response.status = 'Success'
    response.data = {
      data: {
        pictures: [{
          "id": "activity:item:21427",
          "width": 1536,
          "height": 544,
          "description": "魚的夢饜",
          "title": "第12屆美術繪畫比賽-佳作",
          "author": "金華國中_官儀婷",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        },
        {
          "id": "activity:item:21428",
          "width": 1536,
          "height": 544,
          "description": "雨中即景",
          "title": "第12屆美術繪畫比賽-佳作",
          "author": "大德國中_林雨淳",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        },
        {
          "id": "activity:item:21429",
          "width": 1536,
          "height": 544,
          "description": "美哉風城",
          "title": "第12屆美術繪畫比賽-佳作",
          "author": "三民國中_劉湘語",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        },
        {
          "id": "activity:item:21430",
          "width": 1536,
          "height": 544,
          "description": "樂活",
          "title": "第12屆美術繪畫比賽-佳作",
          "author": "古亭國中_郭子瑄",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        },
        {
          "id": "activity:item:21431",
          "width": 1536,
          "height": 544,
          "description": "出發",
          "title": "第12屆美術繪畫比賽-佳作",
          "author": "北市自強國中_阮微甯",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        },
        {
          "id": "activity:item:21432",
          "width": 1536,
          "height": 544,
          "description": "暮",
          "title": "第12屆美術繪畫比賽-佳作",
          "author": "自強國中_胡殷琪",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        },
        {
          "id": "activity:item:21433",
          "width": 1536,
          "height": 544,
          "description": "富足",
          "title": "第12屆美術繪畫比賽-佳作",
          "author": "桃園國中_吳紀東",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        },
        {
          "id": "activity:item:21434",
          "width": 1536,
          "height": 544,
          "description": "港鴨",
          "title": "第12屆美術繪畫比賽-佳作",
          "author": "中壢國中_王律涵",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        },
        {
          "id": "activity:item:21435",
          "width": 1536,
          "height": 544,
          "description": "祈願",
          "title": "第12屆美術繪畫比賽-佳作",
          "author": "雲林東南國中_沈方婷",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        },
        {
          "id": "activity:item:21436",
          "width": 1536,
          "height": 544,
          "description": "鋼架人生",
          "title": "第12屆美術繪畫比賽-佳作",
          "author": "桃園國中_陳雅亭",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        },
        {
          "id": "activity:item:21437",
          "width": 1536,
          "height": 544,
          "description": "玉米與鮮魚的對話",
          "title": "第12屆美術繪畫比賽-佳作",
          "author": "北市大華國中_王薏涵",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        },
        {
          "id": "activity:item:21438",
          "width": 1536,
          "height": 544,
          "description": "街角一隅",
          "title": "第12屆美術繪畫比賽-佳作",
          "author": "基隆二信高中國中部_許瑋家",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        },
        {
          "id": "activity:item:21439",
          "width": 1536,
          "height": 544,
          "description": "熾",
          "title": "第12屆美術繪畫比賽-優選",
          "author": "泰山國中_蔡東佑",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        },
        {
          "id": "activity:item:21440",
          "width": 1536,
          "height": 544,
          "description": "撿蚵人家",
          "title": "第12屆美術繪畫比賽-優選",
          "author": "北市自強國中_丁柏奕",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        },
        {
          "id": "activity:item:21441",
          "width": 1536,
          "height": 544,
          "description": "百年傳承",
          "title": "第12屆美術繪畫比賽-優選",
          "author": "醒吾高中_吳匡奇",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        },
        {
          "id": "activity:item:21442",
          "width": 1536,
          "height": 544,
          "description": "鵝",
          "title": "第12屆美術繪畫比賽-優選",
          "author": "高市鳳甲國中_趙勻荷",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        },
        {
          "id": "activity:item:21443",
          "width": 1536,
          "height": 544,
          "description": "美濃紙傘",
          "title": "第12屆美術繪畫比賽-優選",
          "author": "楊梅國中_鐘羽茗",
          "path": "https://upload.cc/i1/2022/03/24/pB94i0.jpg"
        }]
      }
    }
    response.message = null
    res.json(response)
  })


router.use(function (req, res) {
  response.message = "API NOT MATCH"
  res.json(response)
})
router.route('/GalleryRoom')
  .get(function (req, res, next) {
    response.status = 'Success'
    response.data = {
      data: 'GalleryRoom\'s Data!!!'
    }
    response.message = null
    res.json(response)
  })


module.exports = router