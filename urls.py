# from django.conf.urls import patterns, url, include
# from django.views.generic import TemplateView
# from . import views, APP_NAME
#
# urlpatterns = patterns('',
#     url(r'^$', views.index, name='%s.index' % APP_NAME),
# )
from django.conf.urls import patterns, url, include
import views
from . import APP_NAME

from api import LayerResource
from tastypie.api import Api

Resources_api = Api(api_name="api")
Resources_api.register(LayerResource())

urlpatterns = patterns('',
   url(r'^$', views.index, name='%s.index' % APP_NAME),
   url(r'^styles/(?P<layername>[^/]*)$', views.layer_styles, name='%s.layer_styles' % APP_NAME),
   url(r'^styles/save/(?P<layer_name>[^/]*)/(?P<style_name>[^/]*)$', views.save_style, name='%s.save_style' % APP_NAME),
   url(r'^', include(Resources_api.urls)),
)
