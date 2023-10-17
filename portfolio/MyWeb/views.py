from django.shortcuts import render
from django import forms

class ContactForms(forms.Form):
    name = forms.CharField()    
    email = forms.EmailField()
    message = forms.CharField()

    def __init__(self, *args, **kwargs):
        super(ContactForms, self).__init__(*args, **kwargs)

        self.fields['message'].widget = forms.Textarea()

        for visible in self.visible_fields():
            visible.field.widget.attrs = {
                'class': 'form-input', 
                'placeholder': visible.label,
                'rows': 5
            }   
            visible.label = False

# Create your views here.
def index(request):
    return render(request, 'page/index.html', {
        'form': ContactForms()
    })