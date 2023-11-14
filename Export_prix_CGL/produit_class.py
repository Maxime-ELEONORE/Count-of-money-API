#! /usr/bin/env python3
from unidecode import unidecode
import re

def process_string(s):
    # Convertir la chaîne en minuscules
    s = s.lower()

    # Utiliser unidecode pour éliminer les accents
    s = unidecode(s)

    # Utiliser une expression régulière pour éliminer tous les caractères non alphanumériques
    s = re.sub(r'[^a-z0-9-,-.]', '', s)

    return s

class Produit:

    def __init__(self, name, reference, our_price):
        self.name = name
        self.reference = reference
        self.our_price = our_price
        self.list_site_name = []
        self.list_site_price = []
        self.list_product_url = []
    
    def add_site(self, site_name, site_price, url_product):
        print(f"Prix ajouter à {self.reference} , le prix est: {site_price}€ sur {site_name}")
        self.list_site_name.append(site_name)
        self.list_product_url.append(url_product)

        if site_price:
            cleaned_price = process_string(site_price.strip().replace('€', '').replace(',', '.'))
            try:
                converted_price = int(float(cleaned_price))  # Convertir en flottant puis en entier
                self.list_site_price.append(converted_price)
            except ValueError:
                print(f"Impossible de convertir le prix: {site_price}")
                self.list_site_price.append(-1)
        else:
            self.list_site_price.append(-1)

    def get_price(self):
        return self.list_site_price
    
    def get_url_product(self):
        return self.list_product_url
    
    def get_ourprice(self):
        return self.our_price
    
    def get_reference(self):
        return self.reference
    def get_name(self):
        return self.name