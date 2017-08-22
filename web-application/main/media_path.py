# coding=utf-8
from __future__ import unicode_literals
import uuid


def category_image_upload_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/categories/images/<filename>
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (instance.slug, ext)
    return 'categories/images/{0}'.format(filename)


def company_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/companies/company_slug/logo/<filename>
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return 'companies/{0}/company_logo/{1}'.format(instance.slug, filename)


def certificate_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/companies/company_slug/certifications/<filename>
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return "companies/{0}/certifications/{1}".format(instance.company.slug, filename)


def specialist_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/specialists/specialist_slug/photo/<filename>
    ext = filename.split('.')[-1]
    filename = "%s.%s" % (uuid.uuid4(), ext)
    return 'specialists/{0}/photo/{1}'.format(instance.slug, filename)
