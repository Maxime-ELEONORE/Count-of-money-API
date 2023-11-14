#! /usr/bin/env python3
import requests
import re
import brotli # à enlever si jamais utiliser et a pip uninstall brotli mais pour l'instant on sais jamais
from unidecode import unidecode
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from fp.fp import FreeProxy

def process_string(s):
    # Convertir la chaîne en minuscules
    s = s.lower()

    # Utiliser unidecode pour éliminer les accents
    s = unidecode(s)

    # Utiliser une expression régulière pour éliminer tous les caractères non alphanumériques
    s = re.sub(r'[^a-z0-9]', '', s)

    return s

class Site:

    def __init__(self, tech, url, name, headers, cookies, article_balise, article_class ,reference_balise, reference_class, price_balise, price_class, slash_representation, darty=0):
        self.url = url
        self.name = name
        self.headers = headers
        self.cookies = cookies
        self.article_balise = article_balise
        self.article_class = article_class
        self.reference_balise = reference_balise
        self.reference_class = reference_class
        self.price_balise = price_balise
        self.price_class = price_class
        self.tech = tech # "javascript" ou "html"
        self.slash_representation = slash_representation
        self.darty = darty
    
    def get_name(self):
        return self.name
        

    def get_price(self, reference):
        try:
            if self.tech == "javascript":
                return self.get_price_with_javascript(reference)
            elif self.tech == "selenium":
                return self.get_price_with_selenium(reference)
            proxies = {
                'http': FreeProxy().get()
            }
            
            # Construction de l'URL avec la référence donnée
            if self.darty == 1 and "/" in reference:
                reference_without_slash = reference.replace("/", self.slash_representation).replace(" ", "")
                url_temp = self.url[0]
                url_temp = url_temp[:-1]
                url = url_temp + "?text=" + reference_without_slash
            else :
                reference_without_slash = reference.replace("/", self.slash_representation).replace(" ", "")
                url = self.url[0] + reference_without_slash + self.url[1]
            print(url)

            # Effectuer la requête HTTP
            response = requests.get(url, headers=self.headers, cookies=self.cookies, timeout=10, proxies=proxies)

            if response.status_code != 200:
                print(f"Erreur {response.status_code}: Impossible d'accéder au site.")
                return self.name, None

            # Parse le contenu HTML avec BeautifulSoup
            soup = BeautifulSoup(response.content, 'html.parser')

            # Sélectionne l'élément <article> avec l'attribut data-index="0"
            article = soup.find(self.article_balise, class_=self.article_class)
            if not article:
                print(f"Article avec {self.article_balise} non trouvé.")
                return self.name, None

            # Vérifie que le produit a la bonne référence
            product_label = article.find(self.reference_balise, class_=self.reference_class)
            if not product_label or process_string(reference) not in process_string(product_label.get_text()):
                print("Référence du produit non trouvée.")
                return self.name, None

            # Récupère le prix du produit
            price_element = article.find(self.price_balise, class_=self.price_class)
            if not price_element:
                print("Prix du produit non trouvé.")
                return self.name, None
            
            return self.name, price_element.get_text()
        except:
            return self.name, None
    
    def get_price_with_javascript(self, reference):
        try:
            with sync_playwright() as p:
                # Utilisation du navigateur Chrome (vous pouvez aussi utiliser 'firefox' ou 'webkit')
                browser = p.chromium.launch(headless=True)

                # Création d'une nouvelle page
                page = browser.new_page()

                # Construction de l'URL avec la référence donnée
                url_with_slash = reference.replace("/", self.slash_representation)
                url = self.url[0] + url_with_slash + self.url[1]
                print(url)
                # Navigation vers le site
                page.goto(url)


                # Vérification si l'élément avec la classe "c-r_refFournisseur" existe et contient la référence demandée
                ref_element = page.wait_for_selector(self.reference_balise + '.' + self.reference_class, timeout=5000)
                if not ref_element:
                    print("Element avec la classe 'c-r_refFournisseur' non trouvé.")
                    browser.close()
                    return self.name, None
                if process_string(reference) not in process_string(ref_element.text_content()):
                    print("La référence de l'élément ne correspond pas à la référence demandée.")
                    browser.close()
                    return self.name, None

                # Récupération du prix
                price_element = page.wait_for_selector(self.price_balise + '.' + self.price_class)
                if not price_element:
                    print("Element avec la classe 'wrapper-price_int' non trouvé.")
                    browser.close()
                    return self.name, None
                
                price = price_element.text_content()

                # Fermeture du navigateur
                browser.close()

                return self.name, price
        except:
            return self.name, None

        return self.name, None
    


    def get_price_with_selenium(self, reference):
        try:
            # Utilisation du navigateur Chrome
            browser = webdriver.Chrome()
            

            # Construction de l'URL avec la référence donnée
            url_with_slash = reference.replace("/", self.slash_representation)
            url = self.url[0] + url_with_slash + self.url[1]
            print(url)
            
            # Navigation vers le site
            browser.get(url)

            # Attendre et cliquer sur le bouton "Continuer sans accepter"
            continue_button = WebDriverWait(browser, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, ".WelcomeStep__DiscardButton-sc-18c5grd-0.imbiHT.ax-discardButton"))
            )
            continue_button.click()
            # Vérification si l'élément avec la classe "c-r_refFournisseur" existe et contient la référence demandée
            
            print("ca:" + str(process_string(reference)))
            ref_element = WebDriverWait(browser, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, self.reference_balise + '.' + self.reference_class))
            )
            print("a ca:"+str(process_string(ref_element.text)))
            if not ref_element:
                print("Element avec la classe 'c-r_refFournisseur' non trouvé.")
                browser.quit()
                return self.name, None, url
            if process_string(reference) not in process_string(ref_element.text):
                print("La référence de l'élément ne correspond pas à la référence demandée.")
                browser.quit()
                return self.name, None, url
            
            # Récupération du prix
            price_element = WebDriverWait(browser, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, self.price_balise + '.' + self.price_class))
            )
            if not price_element:
                print("Element avec la classe 'wrapper-price_int' non trouvé.")
                browser.quit()
                return self.name, None, url
                
            price = price_element.text

            # Fermeture du navigateur
            browser.quit()

            return self.name, price, url
        except Exception as e:
            print(e)
            return self.name, None , None
