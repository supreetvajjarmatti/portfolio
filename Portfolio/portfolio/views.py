from django.shortcuts import render, redirect
from .models import Contact


# Create your views here.

def index(request):
    return render(request,'index.html')


def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        project = request.POST.get('project')
        message = request.POST.get('message')

        # Save the data to the database
        ContactMessage.objects.create(
            name=name,
            email=email,
            project=project,
            message=message
        )

        # Redirect or render success page as needed
        return redirect('success_page')  # Replace 'success_page' with your success page URL

    return render(request, 'portfolio/contact.html')

def success_page(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        project = request.POST.get('project')
        message = request.POST.get('message')

        contact = Contact(name=name, email=email, project=project, message=message)
        contact.save()

        # You can redirect to a success page or render a template
        return render(request, 'success_page.html')

    return redirect('index')
