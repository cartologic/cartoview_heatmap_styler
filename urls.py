# from django.conf.urls import patterns, url, include
# from django.views.generic import TemplateView
# from . import views, APP_NAME
#
# urlpatterns = patterns('',
#     url(r'^$', views.index, name='%s.index' % APP_NAME),
# )
from django.urls import path, re_path, include
from . import views, APP_NAME

from .api import LayerResource
from tastypie.api import Api

Resources_api = Api(api_name="api")
Resources_api.register(LayerResource())

urlpatterns = [
   re_path(r'^$', views.index, name='%s.index' % APP_NAME),
   path('styles/<str:layername>/', views.layer_styles, name='%s.layer_styles' % APP_NAME),
   path('styles/save/<str:layer_name>/<str:style_name>', views.save_style, name='%s.save_style' % APP_NAME),
   re_path(r'^', include(Resources_api.urls)),
]
