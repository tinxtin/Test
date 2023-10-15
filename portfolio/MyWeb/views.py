from django.shortcuts import render
from django import forms

class ContactForms(forms.Form):
    name = forms.CharField()
    email = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea())

    def __init__(self, *args, **kwargs):
        super(ContactForms, self).__init__(*args, **kwargs)
        for visiable in self.visible_fields():
            visiable.field.widget.attrs['class'] = 'form-input'
            visiable.field.widget.attrs['autocomplete'] = 'off'
            visiable.field.widget.attrs['placeholder'] = visiable.label
            visiable.label = False

# Create your views here.
def index(request):
    return render(request, 'page/index.html', {
        'form': ContactForms()
    })